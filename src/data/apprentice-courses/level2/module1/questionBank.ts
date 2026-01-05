// Module 1: Health and Safety in Building Services Engineering - Question Bank
// 250 questions covering all Module 1 content for Level 2 Electrical Course

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const module1Questions: Question[] = [
  // Section 1: Legislation and Duties (Questions 1-42)
  {
    id: 1,
    question: "What is the main purpose of the Health and Safety at Work Act 1974?",
    options: [
      "To provide guidance on electrical installation methods",
      "To ensure the health, safety and welfare of all employees at work",
      "To regulate the testing and certification of electrical equipment", 
      "To establish building regulations for electrical installations"
    ],
    correctAnswer: 1,
    explanation: "HASAWA 1974 is the primary legislation ensuring health, safety and welfare of all employees and others affected by work activities."
  },
  {
    id: 2,
    question: "Which regulation specifically covers electrical safety at work?",
    options: [
      "Building Regulations",
      "Electricity at Work Regulations 1989",
      "Construction (Design and Management) Regulations",
      "Manual Handling Operations Regulations"
    ],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations 1989 specifically cover electrical safety requirements in the workplace."
  },
  {
    id: 3,
    question: "Under HASAWA, who has the primary duty to ensure workplace safety?",
    options: [
      "Employees only",
      "The HSE only",
      "Employers",
      "Trade unions"
    ],
    correctAnswer: 2,
    explanation: "Employers have the primary duty under HASAWA to ensure the health, safety and welfare of their employees."
  },
  {
    id: 4,
    question: "What are employees' duties under HASAWA?",
    options: [
      "No duties - only employers have responsibilities",
      "To take reasonable care of themselves and others, and cooperate with employers",
      "Only to follow written instructions",
      "To report everything to the HSE"
    ],
    correctAnswer: 1,
    explanation: "Employees must take reasonable care of their own and others' health and safety, and cooperate with their employer."
  },
  {
    id: 5,
    question: "Which organisation enforces health and safety law in Great Britain?",
    options: [
      "Local councils only",
      "Police",
      "Health and Safety Executive (HSE)",
      "Fire service"
    ],
    correctAnswer: 2,
    explanation: "The Health and Safety Executive (HSE) is the primary enforcer of health and safety law in Great Britain."
  },
  {
    id: 6,
    question: "What is the maximum penalty for breaching health and safety law?",
    options: [
      "£500 fine",
      "£5,000 fine",
      "Unlimited fine and/or imprisonment",
      "Warning letter only"
    ],
    correctAnswer: 2,
    explanation: "Serious breaches of health and safety law can result in unlimited fines and/or imprisonment."
  },
  {
    id: 7,
    question: "What does CDM stand for?",
    options: [
      "Construction Design Management",
      "Construction Development Manual",
      "Civil Design Manual",
      "Construction Delivery Method"
    ],
    correctAnswer: 0,
    explanation: "CDM stands for Construction (Design and Management) Regulations which apply to construction projects."
  },
  {
    id: 8,
    question: "When do CDM Regulations apply?",
    options: [
      "Only to large construction projects",
      "All construction projects",
      "Only commercial projects",
      "Only domestic projects"
    ],
    correctAnswer: 1,
    explanation: "CDM Regulations apply to all construction projects, with different duties depending on project size and type."
  },
  {
    id: 9,
    question: "What is the role of the Principal Designer under CDM?",
    options: [
      "To do all the design work",
      "To plan, manage and coordinate health and safety during the pre-construction phase",
      "To supervise all workers",
      "To operate machinery"
    ],
    correctAnswer: 1,
    explanation: "The Principal Designer plans, manages and coordinates health and safety during the pre-construction phase."
  },
  {
    id: 10,
    question: "What is the minimum duration for a construction project to require notification to HSE under CDM?",
    options: [
      "More than 30 days or 500 person days",
      "More than 7 days",
      "Any duration",
      "More than 1 year"
    ],
    correctAnswer: 0,
    explanation: "Projects lasting more than 30 days or involving more than 500 person days must be notified to HSE."
  },
  {
    id: 11,
    question: "What are the duties of a Principal Contractor under CDM?",
    options: [
      "Plan, manage and coordinate health and safety during the construction phase",
      "Design the building",
      "Approve planning applications",
      "Hire all workers"
    ],
    correctAnswer: 0,
    explanation: "The Principal Contractor plans, manages and coordinates health and safety during the construction phase."
  },
  {
    id: 12,
    question: "What must contractors do before starting work on a notifiable project?",
    options: [
      "Nothing special",
      "Provide a construction phase plan",
      "Get insurance",
      "Register with local council"
    ],
    correctAnswer: 1,
    explanation: "A construction phase plan must be prepared and implemented for notifiable projects."
  },
  {
    id: 13,
    question: "What information must be provided in the health and safety file?",
    options: [
      "Only accident records",
      "Information about the structure needed for future construction work, maintenance, and demolition",
      "Only building warranties",
      "Employee records"
    ],
    correctAnswer: 1,
    explanation: "The health and safety file contains information needed for future construction work, maintenance, and demolition."
  },
  {
    id: 14,
    question: "Under EAWR, what must electrical systems be?",
    options: [
      "Cheapest available",
      "Constructed, maintained and used to prevent danger",
      "Painted in safety colours",
      "Located outdoors only"
    ],
    correctAnswer: 1,
    explanation: "EAWR requires electrical systems to be constructed, maintained and used so far as reasonably practicable to prevent danger."
  },
  {
    id: 15,
    question: "What does 'competent person' mean under EAWR?",
    options: [
      "Anyone with electrical qualifications",
      "Person with sufficient training, experience and knowledge to prevent danger",
      "Only qualified electricians",
      "Anyone over 18 years old"
    ],
    correctAnswer: 1,
    explanation: "A competent person has sufficient training, experience and knowledge to prevent danger when working with electricity."
  },
  {
    id: 16,
    question: "What must be done before work on electrical equipment?",
    options: [
      "Put up warning signs",
      "Switch off and prove dead",
      "Work faster",
      "Use more PPE"
    ],
    correctAnswer: 1,
    explanation: "Equipment must be switched off and proved dead, or other precautions taken to prevent danger."
  },
  {
    id: 17,
    question: "What is the purpose of RIDDOR?",
    options: [
      "To reduce paperwork",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "To increase insurance costs",
      "To create more regulations"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR requires the reporting of serious workplace accidents, occupational diseases and dangerous occurrences."
  },
  {
    id: 18,
    question: "Which accidents must be reported under RIDDOR?",
    options: [
      "All accidents",
      "Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences",
      "Only fatal accidents",
      "Only accidents involving visitors"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR requires reporting of deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences."
  },
  {
    id: 19,
    question: "How quickly must deaths and specified injuries be reported under RIDDOR?",
    options: [
      "Within 10 days by telephone",
      "Immediately by telephone followed by written report within 10 days",
      "Within 15 days in writing",
      "No time limit"
    ],
    correctAnswer: 1,
    explanation: "Deaths and specified injuries must be reported immediately by telephone and followed up with a written report within 10 days."
  },
  {
    id: 20,
    question: "What is a 'specified injury' under RIDDOR?",
    options: [
      "Any injury requiring first aid",
      "Serious injuries including fractures, amputations, serious burns",
      "Only head injuries",
      "Minor cuts and bruises"
    ],
    correctAnswer: 1,
    explanation: "Specified injuries include fractures, amputations, serious eye injuries, serious burns, and other major injuries."
  },
  {
    id: 21,
    question: "What is the role of safety representatives?",
    options: [
      "To slow down work",
      "To represent employees in consultations with employers on health and safety matters",
      "To inspect everyone's work",
      "To replace managers"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives represent employees in consultations with employers on health and safety matters."
  },
  {
    id: 22,
    question: "What powers do safety representatives have?",
    options: [
      "No special powers",
      "To investigate accidents, inspect the workplace, receive information, be consulted",
      "To dismiss workers",
      "To stop all work permanently"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives can investigate accidents, inspect workplaces, receive information and be consulted on safety matters."
  },
  {
    id: 23,
    question: "What is an improvement notice?",
    options: [
      "A compliment from HSE",
      "A legal notice requiring improvement to health and safety within a specified time",
      "A suggestion for better work",
      "A training certificate"
    ],
    correctAnswer: 1,
    explanation: "An improvement notice is a legal notice from HSE requiring specific improvements within a set time period."
  },
  {
    id: 24,
    question: "What is a prohibition notice?",
    options: [
      "A notice banning smoking",
      "A legal notice requiring immediate cessation of activities that pose imminent danger",
      "A notice about parking",
      "A notice about working hours"
    ],
    correctAnswer: 1,
    explanation: "A prohibition notice requires immediate cessation of activities that pose a risk of serious personal injury."
  },
  {
    id: 25,
    question: "Can improvement and prohibition notices be appealed?",
    options: [
      "No, they are final",
      "Yes, to an employment tribunal",
      "Only improvement notices",
      "Only prohibition notices"
    ],
    correctAnswer: 1,
    explanation: "Both improvement and prohibition notices can be appealed to an employment tribunal."
  },
  {
    id: 26,
    question: "What is the purpose of health and safety policy?",
    options: [
      "To comply with legal requirements",
      "To demonstrate employer's commitment to health and safety and provide framework for action",
      "To increase paperwork",
      "To satisfy insurance companies"
    ],
    correctAnswer: 1,
    explanation: "A health and safety policy demonstrates the employer's commitment and provides a framework for managing health and safety."
  },
  {
    id: 27,
    question: "When must an employer have a written health and safety policy?",
    options: [
      "Always",
      "If they employ 5 or more people",
      "Only for construction companies",
      "Never required"
    ],
    correctAnswer: 1,
    explanation: "Employers with 5 or more employees must have a written health and safety policy."
  },
  {
    id: 28,
    question: "What are the three main parts of a health and safety policy?",
    options: [
      "Rules, regulations, and procedures",
      "Statement of intent, organisation, and arrangements",
      "Accidents, incidents, and near misses",
      "Training, equipment, and supervision"
    ],
    correctAnswer: 1,
    explanation: "A health and safety policy consists of a statement of intent, organisation section, and arrangements section."
  },
  {
    id: 29,
    question: "What does 'so far as is reasonably practicable' mean?",
    options: [
      "Do whatever is cheapest",
      "Balance the risk against the cost and effort of reducing it",
      "Do nothing",
      "Do everything possible regardless of cost"
    ],
    correctAnswer: 1,
    explanation: "It means balancing the risk against the cost, time and effort needed to reduce or eliminate it."
  },
  {
    id: 30,
    question: "What is the purpose of an Approved Code of Practice (ACOP)?",
    options: [
      "To replace legal requirements",
      "To give practical guidance on complying with legal duties",
      "To provide training courses",
      "To sell safety equipment"
    ],
    correctAnswer: 1,
    explanation: "ACOPs provide practical guidance on how to comply with legal duties and have special status in legal proceedings."
  },
  {
    id: 31,
    question: "What is corporate manslaughter?",
    options: [
      "A civil offence only",
      "A serious criminal offence where an organisation's failure causes death",
      "Not applicable to construction",
      "Only applies to individuals"
    ],
    correctAnswer: 1,
    explanation: "Corporate manslaughter is a serious criminal offence where an organisation's management failures cause death."
  },
  {
    id: 32,
    question: "What are the penalties for corporate manslaughter?",
    options: [
      "Warning letter only",
      "Unlimited fine, remedial orders, publicity orders",
      "£1000 maximum fine",
      "No penalties available"
    ],
    correctAnswer: 1,
    explanation: "Penalties include unlimited fines, remedial orders to address failures, and publicity orders."
  },
  {
    id: 33,
    question: "What must employers consult employees about?",
    options: [
      "Nothing",
      "Health and safety measures, risks, preventive measures, competent persons",
      "Only pay rates",
      "Only working hours"
    ],
    correctAnswer: 1,
    explanation: "Employers must consult on health and safety measures, risks, preventive measures, and appointment of competent persons."
  },
  {
    id: 34,
    question: "What information must employers provide to employees?",
    options: [
      "Only verbal instructions",
      "Health and safety information, risks, preventive measures, emergency procedures",
      "Only company policies",
      "Nothing is required"
    ],
    correctAnswer: 1,
    explanation: "Employers must provide information on health and safety, risks, preventive measures, and emergency procedures."
  },
  {
    id: 35,
    question: "What is vicarious liability?",
    options: [
      "Personal responsibility only",
      "Employer liability for acts of employees in the course of employment",
      "No liability exists",
      "Only applies to contractors"
    ],
    correctAnswer: 1,
    explanation: "Vicarious liability means employers can be held liable for health and safety failures by their employees."
  },
  {
    id: 36,
    question: "What are the main enforcement powers of HSE inspectors?",
    options: [
      "No special powers",
      "Enter premises, examine, investigate, issue notices, prosecute",
      "Only advisory powers",
      "Can only write reports"
    ],
    correctAnswer: 1,
    explanation: "HSE inspectors can enter premises, examine and investigate, issue improvement/prohibition notices, and prosecute."
  },
  {
    id: 37,
    question: "What is the difference between regulations and guidance?",
    options: [
      "No difference",
      "Regulations are legally binding, guidance is advisory",
      "Both are advisory only",
      "Both are legally binding"
    ],
    correctAnswer: 1,
    explanation: "Regulations have legal force and must be followed, while guidance is advisory best practice."
  },
  {
    id: 38,
    question: "What is the purpose of health surveillance?",
    options: [
      "To spy on workers",
      "To detect health effects early and take preventive action",
      "To reduce insurance costs",
      "To collect medical data"
    ],
    correctAnswer: 1,
    explanation: "Health surveillance detects adverse health effects at an early stage so preventive action can be taken."
  },
  {
    id: 39,
    question: "When might health surveillance be required?",
    options: [
      "Never",
      "When there's exposure to specific hazards like noise, vibration, asbestos",
      "Only for managers",
      "For all workers always"
    ],
    correctAnswer: 1,
    explanation: "Health surveillance is required for exposure to specified hazards that can cause identifiable health effects."
  },
  {
    id: 40,
    question: "What is the role of occupational health?",
    options: [
      "To treat injuries only",
      "To prevent work-related illness and promote health and wellbeing",
      "To provide general medical care",
      "To reduce staffing costs"
    ],
    correctAnswer: 1,
    explanation: "Occupational health prevents work-related illness and injury and promotes worker health and wellbeing."
  },
  {
    id: 41,
    question: "What are absolute duties in health and safety law?",
    options: [
      "Duties that can be ignored",
      "Duties that must be complied with regardless of cost or practicability",
      "Duties that are optional",
      "Duties that only apply sometimes"
    ],
    correctAnswer: 1,
    explanation: "Absolute duties must be complied with regardless of cost - there are no qualifying words like 'reasonably practicable'."
  },
  {
    id: 42,
    question: "What is the significance of British Standards in health and safety?",
    options: [
      "They have no legal significance",
      "They provide recognised standards that can be used as evidence of good practice",
      "They are legally binding",
      "They only apply to British companies"
    ],
    correctAnswer: 1,
    explanation: "British Standards provide recognised standards of good practice that can be used as evidence in legal proceedings."
  },

  // Section 2: Electric Shock and Burns (Questions 43-84)
  {
    id: 43,
    question: "What is the most dangerous current path through the human body?",
    options: [
      "Foot to foot",
      "Hand to hand across the chest",
      "Hand to foot",
      "Head to toe"
    ],
    correctAnswer: 1,
    explanation: "Hand to hand across the chest is most dangerous as current passes through the heart, potentially causing cardiac arrest."
  },
  {
    id: 44,
    question: "At what current level can electric shock become fatal?",
    options: [
      "1 amp",
      "50 milliamps",
      "500 milliamps", 
      "5 amps"
    ],
    correctAnswer: 1,
    explanation: "Currents as low as 50mA can cause ventricular fibrillation and be potentially fatal."
  },
  {
    id: 45,
    question: "What determines the severity of electric shock?",
    options: [
      "Only voltage",
      "Only current",
      "Current, duration, path through body, frequency",
      "Only the type of equipment"
    ],
    correctAnswer: 2,
    explanation: "Shock severity depends on current magnitude, duration of contact, path through the body, and frequency."
  },
  {
    id: 46,
    question: "What voltage is considered 'low voltage' in the UK?",
    options: [
      "Up to 50V",
      "Up to 230V",
      "Up to 1000V AC or 1500V DC",
      "Up to 415V"
    ],
    correctAnswer: 2,
    explanation: "Low voltage is defined as not exceeding 1000V AC or 1500V DC between conductors or 600V AC or 900V DC to earth."
  },
  {
    id: 47,
    question: "What is the typical voltage of a domestic electrical supply in the UK?",
    options: [
      "110V",
      "230V",
      "415V",
      "240V"
    ],
    correctAnswer: 1,
    explanation: "The standard domestic supply voltage in the UK is 230V single phase."
  },
  {
    id: 48,
    question: "What immediate action should you take if someone receives an electric shock?",
    options: [
      "Touch them to check if they're okay",
      "Switch off power supply or remove casualty using non-conductive material",
      "Pour water on them",
      "Move them immediately"
    ],
    correctAnswer: 1,
    explanation: "First switch off the power or use non-conductive material to break contact - never touch someone still in contact with electricity."
  },
  {
    id: 49,
    question: "What is the effect of 1-5mA current through the body?",
    options: [
      "Fatal",
      "Barely perceptible",
      "Painful shock",
      "Muscular control lost"
    ],
    correctAnswer: 1,
    explanation: "1-5mA produces a barely perceptible tingling sensation."
  },
  {
    id: 50,
    question: "At what current level do you lose muscular control (let-go threshold)?",
    options: [
      "5-10mA",
      "10-20mA",
      "20-30mA",
      "30-50mA"
    ],
    correctAnswer: 1,
    explanation: "At 10-20mA, muscular control is lost and you cannot let go of the conductor."
  },
  {
    id: 51,
    question: "What happens at current levels of 50-100mA?",
    options: [
      "No effect",
      "Slight tingling",
      "Ventricular fibrillation - potentially fatal",
      "Minor burns only"
    ],
    correctAnswer: 2,
    explanation: "50-100mA can cause ventricular fibrillation of the heart, which is potentially fatal."
  },
  {
    id: 52,
    question: "Why is AC more dangerous than DC at the same voltage?",
    options: [
      "DC is always more dangerous",
      "AC causes muscular spasm and affects the heart rhythm",
      "There is no difference",
      "DC travels faster"
    ],
    correctAnswer: 1,
    explanation: "AC at 50Hz is particularly dangerous as it can cause muscular spasm and interfere with heart rhythm."
  },
  {
    id: 53,
    question: "What factors affect body resistance to electric current?",
    options: [
      "Only skin thickness",
      "Skin condition (wet/dry), contact area, voltage, frequency",
      "Only age",
      "Only clothing"
    ],
    correctAnswer: 1,
    explanation: "Body resistance varies with skin condition, contact area, applied voltage, current frequency and individual factors."
  },
  {
    id: 54,
    question: "How does wet skin affect electrical resistance?",
    options: [
      "Increases resistance",
      "No effect",
      "Dramatically reduces resistance",
      "Only affects DC"
    ],
    correctAnswer: 2,
    explanation: "Wet skin dramatically reduces electrical resistance, making electric shock more likely and severe."
  },
  {
    id: 55,
    question: "What is the typical resistance of dry skin?",
    options: [
      "100-1000 ohms",
      "1000-100,000 ohms",
      "1-10 ohms",
      "1 million ohms"
    ],
    correctAnswer: 1,
    explanation: "Dry skin typically has resistance of 1000-100,000 ohms, but this drops dramatically when wet."
  },
  {
    id: 56,
    question: "What type of burn is caused by electric current?",
    options: [
      "Only surface burns",
      "Deep internal burns along current path",
      "Only external burns",
      "No burns occur"
    ],
    correctAnswer: 1,
    explanation: "Electric current causes deep internal burns along the current path through tissues and organs."
  },
  {
    id: 57,
    question: "What is an arc burn?",
    options: [
      "A type of chemical burn",
      "Burn caused by electric arc/flash producing intense heat",
      "A cold burn",
      "Burn from hot water"
    ],
    correctAnswer: 1,
    explanation: "Arc burns are caused by electric arcs/flashes that can reach temperatures of 20,000°C causing severe burns."
  },
  {
    id: 58,
    question: "What temperature can an electric arc reach?",
    options: [
      "100°C",
      "1,000°C",
      "20,000°C",
      "500°C"
    ],
    correctAnswer: 2,
    explanation: "Electric arcs can reach temperatures of approximately 20,000°C - hotter than the surface of the sun."
  },
  {
    id: 59,
    question: "What are the main types of electrical burns?",
    options: [
      "Only contact burns",
      "Contact burns, arc burns, and flash burns",
      "Only flash burns",
      "Chemical burns only"
    ],
    correctAnswer: 1,
    explanation: "The main types are contact burns (from touching live parts), arc burns, and flash burns from electrical explosions."
  },
  {
    id: 60,
    question: "How should electrical burns be treated?",
    options: [
      "Apply butter or oil",
      "Cool with water for 20+ minutes, cover with sterile dressing, seek medical help",
      "Apply ice directly",
      "Leave uncovered to air dry"
    ],
    correctAnswer: 1,
    explanation: "Cool burns with water for at least 20 minutes, cover with sterile dressing, and seek medical attention."
  },
  {
    id: 61,
    question: "What makes electrical burns particularly dangerous?",
    options: [
      "They look worse than they are",
      "Internal damage may be extensive despite limited external signs",
      "They heal quickly",
      "They only affect skin"
    ],
    correctAnswer: 1,
    explanation: "Electrical burns can cause extensive internal damage to organs and tissues that isn't visible externally."
  },
  {
    id: 62,
    question: "What immediate first aid should be given for electric shock?",
    options: [
      "Give water to drink",
      "Check for breathing/circulation, give CPR if needed, treat for shock",
      "Apply heat",
      "Make them walk around"
    ],
    correctAnswer: 1,
    explanation: "Check breathing and circulation, give CPR if required, treat for shock and get immediate medical help."
  },
  {
    id: 63,
    question: "Why should you never use water on electrical equipment during a fire?",
    options: [
      "Water is ineffective",
      "Water conducts electricity and can cause electrocution",
      "It damages equipment",
      "It's too expensive"
    ],
    correctAnswer: 1,
    explanation: "Water conducts electricity and using it on live electrical equipment can cause electrocution."
  },
  {
    id: 64,
    question: "What type of fire extinguisher should be used on electrical fires?",
    options: [
      "Water",
      "Foam",
      "CO2 or dry powder",
      "Wet chemical"
    ],
    correctAnswer: 2,
    explanation: "CO2 or dry powder extinguishers should be used on electrical fires as they don't conduct electricity."
  },
  {
    id: 65,
    question: "What is step potential?",
    options: [
      "Voltage between ladder steps",
      "Voltage difference between feet when walking near earthed equipment",
      "Voltage needed to climb stairs",
      "Potential energy when walking"
    ],
    correctAnswer: 1,
    explanation: "Step potential is the voltage difference between feet when walking on ground near earthed electrical equipment."
  },
  {
    id: 66,
    question: "What is touch potential?",
    options: [
      "Voltage when touching any surface",
      "Voltage between hand and feet when touching equipment",
      "Voltage needed to operate switches",
      "Static electricity"
    ],
    correctAnswer: 1,
    explanation: "Touch potential is the voltage difference between hand and feet when touching electrical equipment."
  },
  {
    id: 67,
    question: "What is the main protection against direct contact with electricity?",
    options: [
      "Warning signs only",
      "Insulation of live parts",
      "Training only",
      "Good lighting"
    ],
    correctAnswer: 1,
    explanation: "Insulation of live parts provides the primary protection against direct contact with electrical conductors."
  },
  {
    id: 68,
    question: "What is indirect contact?",
    options: [
      "Touching live parts directly",
      "Touching exposed metalwork that has become live due to a fault",
      "Being near electrical equipment",
      "Using electrical tools"
    ],
    correctAnswer: 1,
    explanation: "Indirect contact is touching exposed metalwork that has become live due to an insulation fault."
  },
  {
    id: 69,
    question: "What protects against indirect contact?",
    options: [
      "Insulation only",
      "Earthing and automatic disconnection",
      "Warning signs",
      "Good housekeeping"
    ],
    correctAnswer: 1,
    explanation: "Earthing and automatic disconnection of supply protects against indirect contact by quickly disconnecting faulty circuits."
  },
  {
    id: 70,
    question: "What is an RCD?",
    options: [
      "Really Cheap Device",
      "Residual Current Device - detects earth leakage currents",
      "Rotation Control Device",
      "Remote Control Device"
    ],
    correctAnswer: 1,
    explanation: "An RCD (Residual Current Device) detects earth leakage currents and quickly disconnects the supply."
  },
  {
    id: 71,
    question: "How quickly should an RCD operate?",
    options: [
      "Within 1 second",
      "Within 40 milliseconds for 30mA types",
      "Within 5 seconds",
      "No time limit"
    ],
    correctAnswer: 1,
    explanation: "RCDs must operate within 40ms for 30mA devices and 300ms for higher rating devices."
  },
  {
    id: 72,
    question: "What current should a standard RCD trip at?",
    options: [
      "30mA",
      "100mA", 
      "300mA",
      "1A"
    ],
    correctAnswer: 0,
    explanation: "Standard RCDs for additional protection trip at 30mA, which is below the dangerous level."
  },
  {
    id: 73,
    question: "Why are isolation procedures important?",
    options: [
      "Legal requirement only",
      "To prevent electric shock during maintenance work",
      "To save energy",
      "To prevent equipment damage"
    ],
    correctAnswer: 1,
    explanation: "Proper isolation prevents electric shock and ensures safety during maintenance and repair work."
  },
  {
    id: 74,
    question: "What is the safe isolation procedure?",
    options: [
      "Just switch off",
      "Switch off, isolate, lock off, test, prove dead",
      "Put up signs only",
      "Tell everyone verbally"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation requires switching off, isolating, locking off, testing equipment, and proving dead."
  },
  {
    id: 75,
    question: "What should you do before starting work on electrical equipment?",
    options: [
      "Start work immediately",
      "Prove the equipment is dead using an approved voltage tester",
      "Assume it's safe",
      "Just switch it off"
    ],
    correctAnswer: 1,
    explanation: "Always prove equipment is dead using a properly functioning approved voltage tester before starting work."
  },
  {
    id: 76,
    question: "What is the purpose of proving the tester?",
    options: [
      "To waste time",
      "To ensure the tester is working before and after testing",
      "To clean the tester",
      "Not necessary"
    ],
    correctAnswer: 1,
    explanation: "Proving the tester on a known live source before and after testing ensures it's working properly."
  },
  {
    id: 77,
    question: "What happens during ventricular fibrillation?",
    options: [
      "Heart beats normally",
      "Heart muscle fibres contract randomly, stopping effective pumping",
      "Heart beats faster",
      "Heart stops temporarily"
    ],
    correctAnswer: 1,
    explanation: "Ventricular fibrillation causes heart muscle fibres to contract randomly, stopping effective blood circulation."
  },
  {
    id: 78,
    question: "What is the treatment for ventricular fibrillation?",
    options: [
      "CPR only",
      "Defibrillation and CPR",
      "Mouth to mouth",
      "Wait for it to stop"
    ],
    correctAnswer: 1,
    explanation: "Ventricular fibrillation requires immediate defibrillation and CPR to restart normal heart rhythm."
  },
  {
    id: 79,
    question: "Why is 50Hz AC particularly dangerous?",
    options: [
      "It's not dangerous",
      "It interferes with the natural electrical signals controlling the heart",
      "It travels faster",
      "It's louder"
    ],
    correctAnswer: 1,
    explanation: "50Hz AC is particularly dangerous as it can interfere with the heart's natural electrical rhythm."
  },
  {
    id: 80,
    question: "What protective equipment helps prevent electric shock?",
    options: [
      "Hard hat only",
      "Insulated tools, gloves, mats, footwear",
      "Safety glasses only",
      "Hi-vis jacket"
    ],
    correctAnswer: 1,
    explanation: "Insulated tools, rubber gloves, insulating mats and footwear provide protection against electric shock."
  },
  {
    id: 81,
    question: "What voltage is considered 'extra low voltage'?",
    options: [
      "Up to 50V AC or 120V DC",
      "Up to 12V AC or 30V DC",
      "Up to 25V AC or 60V DC",
      "Up to 110V AC or 220V DC"
    ],
    correctAnswer: 0,
    explanation: "Extra low voltage (ELV) is not more than 50V AC or 120V DC between conductors or to earth."
  },
  {
    id: 82,
    question: "What is SELV?",
    options: [
      "Safety Extra Low Voltage - separated from earth",
      "Standard Electrical Low Voltage",
      "Simple Electronic Low Voltage",
      "Secure Extra Low Voltage"
    ],
    correctAnswer: 0,
    explanation: "SELV (Safety Extra Low Voltage) is extra low voltage separated from earth and other circuits."
  },
  {
    id: 83,
    question: "What precautions should be taken in wet conditions?",
    options: [
      "No special precautions",
      "Use reduced voltage supplies (110V or lower), RCD protection",
      "Work faster",
      "Use more insulation"
    ],
    correctAnswer: 1,
    explanation: "In wet conditions use reduced voltage supplies (110V centre-tapped or battery tools) and RCD protection."
  },
  {
    id: 84,
    question: "What makes someone more susceptible to electric shock?",
    options: [
      "Being tall",
      "Wet skin, medical conditions, fatigue, contact area",
      "Being young",
      "Wearing glasses"
    ],
    correctAnswer: 1,
    explanation: "Wet skin, certain medical conditions, fatigue, larger contact area and individual physiology affect susceptibility."
  },

  // Section 3: Risk Assessment & Method Statements (Questions 85-126)
  {
    id: 85,
    question: "What is the main purpose of a risk assessment?",
    options: [
      "To comply with paperwork requirements",
      "To identify hazards and evaluate risks to implement appropriate controls",
      "To increase insurance premiums",
      "To slow down work progress"
    ],
    correctAnswer: 1,
    explanation: "Risk assessment identifies hazards, evaluates risks and determines appropriate control measures to prevent harm."
  },
  {
    id: 86,
    question: "What are the five steps of risk assessment?",
    options: [
      "Look, think, plan, do, check",
      "Identify hazards, decide who might be harmed, evaluate risks, record findings, review",
      "Start, continue, finish, report, file",
      "Plan, implement, monitor, review, update"
    ],
    correctAnswer: 1,
    explanation: "The five steps are: identify hazards, decide who might be harmed, evaluate risks, record findings, and review regularly."
  },
  {
    id: 87,
    question: "What is a hazard?",
    options: [
      "The likelihood of harm occurring",
      "Something with potential to cause harm",
      "An accident that has happened",
      "A safety procedure"
    ],
    correctAnswer: 1,
    explanation: "A hazard is anything with the potential to cause harm, such as chemicals, electricity, working at height."
  },
  {
    id: 88,
    question: "What is risk?",
    options: [
      "Something dangerous",
      "The likelihood that a hazard will cause harm and the severity of that harm",
      "A safety procedure",
      "An accident"
    ],
    correctAnswer: 1,
    explanation: "Risk is the likelihood that a hazard will cause harm, combined with the severity of potential harm."
  },
  {
    id: 89,
    question: "What is the hierarchy of control measures?",
    options: [
      "Elimination, substitution, engineering controls, administrative controls, PPE",
      "PPE, training, procedures, engineering, elimination",
      "Planning, implementing, monitoring, reviewing",
      "Identification, evaluation, control, monitoring"
    ],
    correctAnswer: 0,
    explanation: "The hierarchy is: elimination, substitution, engineering controls, administrative controls, and PPE as last resort."
  },
  {
    id: 90,
    question: "Which control measure is most effective?",
    options: [
      "PPE",
      "Training",
      "Elimination of the hazard",
      "Warning signs"
    ],
    correctAnswer: 2,
    explanation: "Elimination of the hazard is the most effective control measure as it completely removes the risk."
  },
  {
    id: 91,
    question: "When should risk assessments be reviewed?",
    options: [
      "Never",
      "Regularly, after incidents, when changes occur",
      "Only annually",
      "Only when asked by HSE"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should be reviewed regularly, after incidents, accidents, or when significant changes occur."
  },
  {
    id: 92,
    question: "Who should carry out risk assessments?",
    options: [
      "Only safety officers",
      "Competent person with knowledge of the work and hazards",
      "Anyone",
      "Only managers"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should be carried out by competent persons with knowledge of the work and associated hazards."
  },
  {
    id: 93,
    question: "What should be recorded in a risk assessment?",
    options: [
      "Only the hazards",
      "Significant findings, people at risk, control measures",
      "Only accidents",
      "Nothing needs recording"
    ],
    correctAnswer: 1,
    explanation: "Written records should be kept of significant findings, people at risk, and control measures implemented."
  },
  {
    id: 94,
    question: "What is a method statement?",
    options: [
      "A financial statement",
      "A document describing how work will be carried out safely",
      "A list of tools needed",
      "A time schedule"
    ],
    correctAnswer: 1,
    explanation: "A method statement describes the sequence of operations and safety measures for carrying out specific work."
  },
  {
    id: 95,
    question: "What should a method statement include?",
    options: [
      "Only the work sequence",
      "Work sequence, hazards, control measures, emergency procedures, supervision",
      "Only safety measures",
      "Only emergency procedures"
    ],
    correctAnswer: 1,
    explanation: "Method statements should include work sequence, hazards, control measures, emergency procedures and supervision arrangements."
  },
  {
    id: 96,
    question: "Who should be involved in developing method statements?",
    options: [
      "Only managers",
      "Competent persons, supervisors, and experienced workers",
      "Only safety officers",
      "External consultants only"
    ],
    correctAnswer: 1,
    explanation: "Method statements should involve competent persons, supervisors and experienced workers who understand the work."
  },
  {
    id: 97,
    question: "When are method statements typically required?",
    options: [
      "Never",
      "For high-risk activities, complex work, CDM projects",
      "Only for electrical work",
      "Only for new workers"
    ],
    correctAnswer: 1,
    explanation: "Method statements are typically required for high-risk activities, complex work and construction projects under CDM."
  },
  {
    id: 98,
    question: "What is the relationship between risk assessment and method statements?",
    options: [
      "They are unrelated",
      "Risk assessment identifies risks, method statement describes control measures",
      "They are the same thing",
      "Method statements replace risk assessments"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments identify hazards and risks; method statements describe how to control those risks during work."
  },
  {
    id: 99,
    question: "What factors should be considered when assessing who might be harmed?",
    options: [
      "Only workers",
      "Workers, visitors, contractors, public, special groups",
      "Only management",
      "Only contractors"
    ],
    correctAnswer: 1,
    explanation: "Consider all who might be affected: workers, visitors, contractors, public, and special groups like pregnant women."
  },
  {
    id: 100,
    question: "What special considerations apply to young workers?",
    options: [
      "No special considerations",
      "Lack experience, may take risks, physical development incomplete",
      "They are safer than adults",
      "Only training considerations"
    ],
    correctAnswer: 1,
    explanation: "Young workers lack experience, may be more willing to take risks, and their physical development may be incomplete."
  },
  {
    id: 101,
    question: "What considerations apply to pregnant workers?",
    options: [
      "No special considerations",
      "Certain hazards pose additional risks to mother and unborn child",
      "They cannot work",
      "Only manual handling restrictions"
    ],
    correctAnswer: 1,
    explanation: "Pregnancy may increase risks from certain hazards, requiring additional controls to protect mother and child."
  },
  {
    id: 102,
    question: "What is meant by 'reasonably foreseeable'?",
    options: [
      "Anything that could possibly happen",
      "Events that are likely to happen or could reasonably be expected",
      "Only events that have happened before",
      "Impossible events"
    ],
    correctAnswer: 1,
    explanation: "Reasonably foreseeable means events that are likely to happen or could reasonably be expected in the circumstances."
  },
  {
    id: 103,
    question: "How should risk be calculated?",
    options: [
      "Severity only",
      "Likelihood × Severity = Risk level",
      "Likelihood only",
      "Number of people affected"
    ],
    correctAnswer: 1,
    explanation: "Risk is typically calculated by multiplying likelihood of occurrence by severity of potential consequences."
  },
  {
    id: 104,
    question: "What is a risk matrix used for?",
    options: [
      "Mathematical calculations",
      "To systematically evaluate and prioritise risks",
      "To confuse people",
      "To waste time"
    ],
    correctAnswer: 1,
    explanation: "A risk matrix helps systematically evaluate likelihood and severity to prioritise risks for action."
  },
  {
    id: 105,
    question: "What does ALARP mean?",
    options: [
      "All Likely Accident Risk Prevented",
      "As Low As Reasonably Practicable",
      "Always Look At Risk Properly",
      "All Local Area Risk Plans"
    ],
    correctAnswer: 1,
    explanation: "ALARP means As Low As Reasonably Practicable - the standard for reducing risk in UK legislation."
  },
  {
    id: 106,
    question: "What is dynamic risk assessment?",
    options: [
      "Mathematical risk calculation",
      "Ongoing assessment of changing conditions during work",
      "Annual risk review",
      "Computer-based assessment"
    ],
    correctAnswer: 1,
    explanation: "Dynamic risk assessment is the ongoing process of assessing changing conditions and new hazards during work."
  },
  {
    id: 107,
    question: "What should workers do if they identify new hazards?",
    options: [
      "Ignore them",
      "Stop work and report to supervisor",
      "Continue working",
      "Deal with them personally"
    ],
    correctAnswer: 1,
    explanation: "Workers should stop work and report new hazards to their supervisor for assessment and control."
  },
  {
    id: 108,
    question: "What is a generic risk assessment?",
    options: [
      "Assessment for one specific task",
      "General assessment covering similar activities that can be adapted",
      "Incomplete assessment",
      "Assessment done by anyone"
    ],
    correctAnswer: 1,
    explanation: "Generic risk assessments cover similar activities and can be adapted for specific situations and locations."
  },
  {
    id: 109,
    question: "What is a site-specific risk assessment?",
    options: [
      "Assessment for any location",
      "Assessment tailored to specific site conditions and hazards",
      "General assessment",
      "Assessment for the whole company"
    ],
    correctAnswer: 1,
    explanation: "Site-specific risk assessments are tailored to the particular conditions, hazards and constraints of a specific location."
  },
  {
    id: 110,
    question: "What information should be communicated to workers?",
    options: [
      "Nothing",
      "Relevant findings of risk assessment and control measures required",
      "Only emergency procedures",
      "Only company policies"
    ],
    correctAnswer: 1,
    explanation: "Workers must be informed of relevant risk assessment findings and the control measures they need to follow."
  },
  {
    id: 111,
    question: "What is the purpose of consultation in risk assessment?",
    options: [
      "To delay work",
      "To get input from those who understand the work and risks",
      "To satisfy legal requirements only",
      "To create more paperwork"
    ],
    correctAnswer: 1,
    explanation: "Consultation ensures input from those with practical knowledge of the work and risks involved."
  },
  {
    id: 112,
    question: "What should happen if control measures are not working effectively?",
    options: [
      "Continue anyway",
      "Review and revise the risk assessment and control measures",
      "Ignore the problem",
      "Blame the workers"
    ],
    correctAnswer: 1,
    explanation: "If control measures aren't effective, the risk assessment should be reviewed and control measures revised."
  },
  {
    id: 113,
    question: "What is residual risk?",
    options: [
      "Risk that has been eliminated",
      "Risk remaining after control measures have been implemented",
      "Risk from accidents",
      "Risk assessment paperwork"
    ],
    correctAnswer: 1,
    explanation: "Residual risk is the risk remaining after control measures have been implemented - it should be ALARP."
  },
  {
    id: 114,
    question: "What factors affect the acceptability of risk?",
    options: [
      "Cost only",
      "Benefits, costs, public perception, legal requirements, available alternatives",
      "Personal opinion only",
      "Company policy only"
    ],
    correctAnswer: 1,
    explanation: "Risk acceptability depends on benefits, costs, public perception, legal requirements and available alternatives."
  },
  {
    id: 115,
    question: "What is tolerable risk?",
    options: [
      "Risk that must be eliminated",
      "Risk that can be accepted in current circumstances based on benefits gained",
      "Risk that is ignored",
      "Risk that is increasing"
    ],
    correctAnswer: 1,
    explanation: "Tolerable risk can be accepted in current circumstances based on the benefits gained and costs of further reduction."
  },
  {
    id: 116,
    question: "What should be included in risk assessment training?",
    options: [
      "Only theory",
      "Hazard identification, risk evaluation, control measures, review processes",
      "Only legal requirements",
      "Only company procedures"
    ],
    correctAnswer: 1,
    explanation: "Training should cover hazard identification, risk evaluation techniques, control measures and review processes."
  },
  {
    id: 117,
    question: "How often should method statements be reviewed?",
    options: [
      "Never",
      "When conditions change, after incidents, regularly",
      "Only annually",
      "When new staff start"
    ],
    correctAnswer: 1,
    explanation: "Method statements should be reviewed when conditions change, after incidents, and as part of regular review."
  },
  {
    id: 118,
    question: "What is the role of supervision in risk control?",
    options: [
      "Not important",
      "Ensure control measures are followed and remain effective",
      "Only for new workers",
      "Only for documentation"
    ],
    correctAnswer: 1,
    explanation: "Supervision ensures control measures are properly implemented, followed and remain effective."
  },
  {
    id: 119,
    question: "What should be done with lessons learned from incidents?",
    options: [
      "File them away",
      "Update risk assessments and method statements",
      "Ignore them",
      "Only report to management"
    ],
    correctAnswer: 1,
    explanation: "Lessons learned from incidents should be used to update and improve risk assessments and method statements."
  },
  {
    id: 120,
    question: "What is a permit to work system?",
    options: [
      "Work scheduling system",
      "Formal system to control high-risk work through written permission",
      "Employee registration system",
      "Training record system"
    ],
    correctAnswer: 1,
    explanation: "Permit to work is a formal system controlling high-risk work through written permission and defined procedures."
  },
  {
    id: 121,
    question: "When might permit to work systems be used?",
    options: [
      "For all work",
      "For high-risk work like confined spaces, hot work, electrical isolation",
      "Never",
      "Only for contractors"
    ],
    correctAnswer: 1,
    explanation: "Permit to work systems are used for high-risk activities like confined space entry, hot work, and electrical isolation."
  },
  {
    id: 122,
    question: "What should be monitored during risk assessment implementation?",
    options: [
      "Nothing",
      "Effectiveness of control measures, changing conditions, worker compliance",
      "Only paperwork completion",
      "Only costs"
    ],
    correctAnswer: 1,
    explanation: "Monitor control measure effectiveness, changing conditions, worker compliance and any new hazards arising."
  },
  {
    id: 123,
    question: "What makes a good risk assessment?",
    options: [
      "Long and complex",
      "Practical, clear, focused on significant risks, regularly reviewed",
      "Short and simple",
      "Technical and theoretical"
    ],
    correctAnswer: 1,
    explanation: "Good risk assessments are practical, clear, focus on significant risks and are regularly reviewed and updated."
  },
  {
    id: 124,
    question: "What is human error analysis?",
    options: [
      "Blaming workers",
      "Systematic analysis of how and why people make mistakes",
      "Performance appraisal",
      "Training evaluation"
    ],
    correctAnswer: 1,
    explanation: "Human error analysis systematically examines how and why people make mistakes to prevent future errors."
  },
  {
    id: 125,
    question: "What factors contribute to human error?",
    options: [
      "Only personal factors",
      "Personal factors, job factors, organisational factors, environmental factors",
      "Only lack of training",
      "Only equipment problems"
    ],
    correctAnswer: 1,
    explanation: "Human error results from personal, job, organisational and environmental factors that should all be considered."
  },
  {
    id: 126,
    question: "How can the likelihood of human error be reduced?",
    options: [
      "Blame and punishment",
      "Good design, training, procedures, culture, and learning from mistakes",
      "More supervision only",
      "Faster working"
    ],
    correctAnswer: 1,
    explanation: "Error reduction requires good design, training, clear procedures, positive culture and learning from mistakes."
  },

  // Section 4: Personal Protective Equipment (Questions 127-168)
  {
    id: 127,
    question: "What does PPE stand for?",
    options: [
      "Personal Protection Equipment",
      "Personal Protective Equipment",
      "Professional Protection Equipment", 
      "Public Protective Equipment"
    ],
    correctAnswer: 1,
    explanation: "PPE stands for Personal Protective Equipment - equipment designed to protect the individual wearer."
  },
  {
    id: 128,
    question: "When should PPE be used?",
    options: [
      "As the first choice",
      "As a last resort when other control measures are not sufficient",
      "Always",
      "Never"
    ],
    correctAnswer: 1,
    explanation: "PPE should be used as a last resort when other control measures cannot adequately reduce the risk."
  },
  {
    id: 129,
    question: "What are the main types of head protection?",
    options: [
      "Hard hats only",
      "Hard hats, bump caps, hair nets",
      "Helmets only",
      "Caps only"
    ],
    correctAnswer: 1,
    explanation: "Head protection includes hard hats for impact protection, bump caps for minor hazards, and hair nets for hygiene."
  },
  {
    id: 130,
    question: "When should safety helmets be worn?",
    options: [
      "Only when working at height",
      "Where there is risk of head injury from falling objects or impact",
      "Only outdoors",
      "Only by visitors"
    ],
    correctAnswer: 1,
    explanation: "Safety helmets should be worn wherever there is risk of head injury from falling objects or impact."
  },
  {
    id: 131,
    question: "What types of eye protection are available?",
    options: [
      "Safety glasses only",
      "Safety glasses, goggles, face shields, welding screens",
      "Sunglasses only",
      "Reading glasses only"
    ],
    correctAnswer: 1,
    explanation: "Eye protection includes safety glasses, goggles, face shields and welding screens for different hazards."
  },
  {
    id: 132,
    question: "When should eye protection be worn?",
    options: [
      "Only when welding",
      "When there's risk from flying particles, chemicals, radiation, or bright light",
      "Only in sunny weather",
      "Only by management"
    ],
    correctAnswer: 1,
    explanation: "Eye protection is needed for risks from flying particles, chemicals, harmful radiation or bright light."
  },
  {
    id: 133,
    question: "What are the main types of hearing protection?",
    options: [
      "Ear plugs only",
      "Ear plugs, ear muffs, semi-insert protectors",
      "Headphones only",
      "Cotton wool"
    ],
    correctAnswer: 1,
    explanation: "Hearing protection includes disposable/reusable ear plugs, ear muffs and semi-insert protectors."
  },
  {
    id: 134,
    question: "At what noise level is hearing protection typically required?",
    options: [
      "85 dB(A) and above",
      "90 dB(A) and above",
      "100 dB(A) and above",
      "Any noise level"
    ],
    correctAnswer: 0,
    explanation: "Hearing protection is typically required at noise levels of 85 dB(A) and above to prevent hearing damage."
  },
  {
    id: 135,
    question: "What types of respiratory protection are available?",
    options: [
      "Masks only",
      "Filtering facepieces, half/full face masks, powered respirators, breathing apparatus",
      "Dust masks only",
      "Surgical masks only"
    ],
    correctAnswer: 1,
    explanation: "Respiratory protection includes filtering facepieces, masks, powered respirators and breathing apparatus."
  },
  {
    id: 136,
    question: "When is respiratory protection needed?",
    options: [
      "Only for asbestos",
      "When there's risk from dust, fumes, gases, vapours, or oxygen deficiency",
      "Only in winter",
      "Only for painters"
    ],
    correctAnswer: 1,
    explanation: "Respiratory protection is needed for airborne hazards like dust, fumes, gases, vapours or oxygen deficiency."
  },
  {
    id: 137,
    question: "What are the main types of hand protection?",
    options: [
      "Gloves only",
      "Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves",
      "Rubber gloves only",
      "Cotton gloves only"
    ],
    correctAnswer: 1,
    explanation: "Hand protection includes cut-resistant, chemical-resistant, thermal and electrical insulating gloves."
  },
  {
    id: 138,
    question: "When should hand protection be worn?",
    options: [
      "Always",
      "When there's risk of cuts, chemical contact, burns, or electrical shock",
      "Only when cold",
      "Only by new workers"
    ],
    correctAnswer: 1,
    explanation: "Hand protection should be worn when there's risk of cuts, chemical contact, burns or electrical shock."
  },
  {
    id: 139,
    question: "What types of foot protection are available?",
    options: [
      "Steel toe caps only",
      "Safety shoes/boots with toe protection, puncture resistance, electrical insulation",
      "Wellington boots only",
      "Trainers"
    ],
    correctAnswer: 1,
    explanation: "Foot protection includes safety shoes/boots with various features like toe protection, puncture resistance, electrical insulation."
  },
  {
    id: 140,
    question: "When should safety footwear be worn?",
    options: [
      "Only on construction sites",
      "Where there's risk of falling objects, puncture wounds, slips, electrical hazards",
      "Only in winter",
      "Only by contractors"
    ],
    correctAnswer: 1,
    explanation: "Safety footwear protects against falling objects, puncture wounds, slips, trips and electrical hazards."
  },
  {
    id: 141,
    question: "What are high-visibility garments used for?",
    options: [
      "Fashion purposes",
      "To make the wearer visible in poor light or near moving vehicles",
      "To keep warm",
      "To identify different trades"
    ],
    correctAnswer: 1,
    explanation: "High-visibility garments make workers visible in poor light conditions or when working near moving vehicles."
  },
  {
    id: 142,
    question: "What does the CE marking on PPE indicate?",
    options: [
      "Made in Europe",
      "Meets European safety standards",
      "Cheap equipment",
      "Environmentally friendly"
    ],
    correctAnswer: 1,
    explanation: "CE marking indicates the PPE meets relevant European safety standards and legal requirements."
  },
  {
    id: 143,
    question: "Who is responsible for providing PPE?",
    options: [
      "Employees",
      "Employers (free of charge to employees)",
      "Government",
      "Trade unions"
    ],
    correctAnswer: 1,
    explanation: "Employers must provide suitable PPE free of charge to employees when needed."
  },
  {
    id: 144,
    question: "Who is responsible for using PPE correctly?",
    options: [
      "Supervisors only",
      "Employees must use PPE correctly and report defects",
      "Safety officers only",
      "No one"
    ],
    correctAnswer: 1,
    explanation: "Employees are responsible for using PPE correctly, looking after it and reporting any defects."
  },
  {
    id: 145,
    question: "What factors should be considered when selecting PPE?",
    options: [
      "Cost only",
      "Nature of hazard, compatibility, comfort, fit, maintenance requirements",
      "Appearance only",
      "Brand name only"
    ],
    correctAnswer: 1,
    explanation: "PPE selection should consider hazard type, compatibility with other PPE, comfort, fit and maintenance needs."
  },
  {
    id: 146,
    question: "Why is PPE fit important?",
    options: [
      "For appearance",
      "Ill-fitting PPE may not provide adequate protection",
      "For comfort only",
      "It's not important"
    ],
    correctAnswer: 1,
    explanation: "Properly fitted PPE is essential for effective protection - ill-fitting equipment may not provide adequate protection."
  },
  {
    id: 147,
    question: "What training should be provided for PPE use?",
    options: [
      "No training needed",
      "How to use, maintain, store PPE and recognise defects",
      "Only written instructions",
      "One-off demonstration"
    ],
    correctAnswer: 1,
    explanation: "Training should cover proper use, maintenance, storage of PPE and how to recognise defects."
  },
  {
    id: 148,
    question: "How should PPE be maintained?",
    options: [
      "Never cleaned",
      "Regular cleaning, inspection, replacement when damaged or worn",
      "Only replaced when broken",
      "Cleaned annually"
    ],
    correctAnswer: 1,
    explanation: "PPE requires regular cleaning, inspection for damage and replacement when worn out or damaged."
  },
  {
    id: 149,
    question: "How should PPE be stored?",
    options: [
      "Anywhere convenient",
      "Clean, dry place away from contamination and damage",
      "In toolboxes",
      "On the floor"
    ],
    correctAnswer: 1,
    explanation: "PPE should be stored in clean, dry conditions away from contamination and potential damage."
  },
  {
    id: 150,
    question: "What should workers do if PPE is damaged?",
    options: [
      "Continue using it",
      "Report damage and stop using until replaced",
      "Try to repair it",
      "Ignore the damage"
    ],
    correctAnswer: 1,
    explanation: "Damaged PPE should be reported immediately and not used until properly repaired or replaced."
  },
  {
    id: 151,
    question: "Why should workers be involved in PPE selection?",
    options: [
      "It's not required",
      "Workers know the practical requirements and comfort needed for effective use",
      "To waste time",
      "Only managers should decide"
    ],
    correctAnswer: 1,
    explanation: "Workers understand the practical requirements and comfort needed for effective PPE use in their specific work."
  },
  {
    id: 152,
    question: "What are the limitations of PPE?",
    options: [
      "No limitations",
      "Only protects the individual, can fail, may give false sense of security",
      "Too expensive",
      "Too effective"
    ],
    correctAnswer: 1,
    explanation: "PPE only protects the individual wearer, can fail, and may give a false sense of security if used incorrectly."
  },
  {
    id: 153,
    question: "What is meant by PPE compatibility?",
    options: [
      "Same brand equipment",
      "Different types of PPE work together without reducing protection",
      "Same colour PPE",
      "Cheap equipment"
    ],
    correctAnswer: 1,
    explanation: "PPE compatibility means different types can be worn together without one reducing the effectiveness of another."
  },
  {
    id: 154,
    question: "How often should PPE be inspected?",
    options: [
      "Never",
      "Before each use and regularly during use",
      "Once a year",
      "Only when damaged"
    ],
    correctAnswer: 1,
    explanation: "PPE should be inspected before each use for damage, wear or contamination that could affect protection."
  },
  {
    id: 155,
    question: "What documentation should be kept for PPE?",
    options: [
      "No records needed",
      "Issue records, training records, inspection records, maintenance records",
      "Only purchase receipts",
      "Only training records"
    ],
    correctAnswer: 1,
    explanation: "Records should include PPE issue, training provided, inspections carried out and maintenance performed."
  },
  {
    id: 156,
    question: "What is personal protective equipment assessment?",
    options: [
      "Checking if PPE looks good",
      "Systematic evaluation to select suitable PPE for specific hazards",
      "Counting PPE items",
      "Checking PPE costs"
    ],
    correctAnswer: 1,
    explanation: "PPE assessment systematically evaluates hazards and selects appropriate equipment to provide adequate protection."
  },
  {
    id: 157,
    question: "When should PPE be replaced?",
    options: [
      "Never",
      "When damaged, worn out, or manufacturer's expiry date reached",
      "Only when broken",
      "Every year regardless of condition"
    ],
    correctAnswer: 1,
    explanation: "PPE should be replaced when damaged, worn beyond safe use, or when manufacturer's expiry date is reached."
  },
  {
    id: 158,
    question: "What factors affect PPE effectiveness?",
    options: [
      "Cost only",
      "Correct selection, proper use, good maintenance, adequate training",
      "Brand name only",
      "Appearance only"
    ],
    correctAnswer: 1,
    explanation: "PPE effectiveness depends on correct selection for hazards, proper use, good maintenance and adequate user training."
  },
  {
    id: 159,
    question: "What is the role of supervisors in PPE management?",
    options: [
      "No role",
      "Ensure PPE is worn correctly, monitor condition, enforce compliance",
      "Only purchasing PPE",
      "Only training workers"
    ],
    correctAnswer: 1,
    explanation: "Supervisors must ensure PPE is worn correctly, monitor its condition and enforce compliance with PPE requirements."
  },
  {
    id: 160,
    question: "How should contaminated PPE be handled?",
    options: [
      "Ignore contamination",
      "Decontaminate safely or dispose of according to specific procedures",
      "Wash in normal washing machine",
      "Throw in normal bin"
    ],
    correctAnswer: 1,
    explanation: "Contaminated PPE requires safe decontamination or disposal according to specific procedures for the contaminant type."
  },
  {
    id: 161,
    question: "What are the categories of PPE?",
    options: [
      "Only one category",
      "Category I (simple), Category II (intermediate), Category III (complex)",
      "Only two categories",
      "No categories exist"
    ],
    correctAnswer: 1,
    explanation: "PPE is categorised as Category I (simple), Category II (intermediate), or Category III (complex) based on risk level."
  },
  {
    id: 162,
    question: "What requires special consideration for electrical workers' PPE?",
    options: [
      "Only appearance",
      "Electrical insulation properties and arc flash protection",
      "Only cost",
      "Only comfort"
    ],
    correctAnswer: 1,
    explanation: "Electrical workers need PPE with electrical insulation properties and protection against arc flash hazards."
  },
  {
    id: 163,
    question: "What is arc flash protection?",
    options: [
      "Protection from sunlight",
      "Protection from electrical arc blast and thermal energy",
      "Protection from camera flashes",
      "Protection from lightning"
    ],
    correctAnswer: 1,
    explanation: "Arc flash protection guards against electrical arc blast and the intense thermal energy it produces."
  },
  {
    id: 164,
    question: "When should electrical insulating gloves be tested?",
    options: [
      "Never",
      "Before issue, periodically during use, after suspected damage",
      "Only when purchased",
      "Only annually"
    ],
    correctAnswer: 1,
    explanation: "Electrical insulating gloves must be tested before issue, regularly during use, and after any suspected damage."
  },
  {
    id: 165,
    question: "What is the purpose of PPE marking and labelling?",
    options: [
      "Decoration only",
      "Identify PPE type, performance standards, limitations, expiry dates",
      "Show ownership",
      "Marketing purposes"
    ],
    correctAnswer: 1,
    explanation: "Marking identifies PPE type, performance standards met, limitations and expiry dates for safe use."
  },
  {
    id: 166,
    question: "How should PPE information be communicated to workers?",
    options: [
      "Not necessary",
      "Training, written instructions, demonstrations, ongoing reinforcement",
      "One-off verbal instruction",
      "Posters only"
    ],
    correctAnswer: 1,
    explanation: "PPE information should be communicated through training, written instructions, demonstrations and ongoing reinforcement."
  },
  {
    id: 167,
    question: "What role does comfort play in PPE effectiveness?",
    options: [
      "No role",
      "Uncomfortable PPE is less likely to be worn correctly or consistently",
      "Comfort reduces protection",
      "Only important for appearance"
    ],
    correctAnswer: 1,
    explanation: "Comfortable PPE is more likely to be worn correctly and consistently, improving overall protection."
  },
  {
    id: 168,
    question: "What should be included in a PPE programme?",
    options: [
      "Only purchasing procedures",
      "Assessment, selection, training, maintenance, monitoring, review",
      "Only training",
      "Only storage procedures"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive PPE programme includes assessment, selection, training, maintenance, monitoring and regular review."
  },

  // Section 5: Site Safety Procedures (Questions 169-210)
  {
    id: 169,
    question: "What should be your first action when arriving on a new construction site?",
    options: [
      "Start work immediately",
      "Attend site induction and safety briefing",
      "Find the nearest toilet",
      "Look for the site manager"
    ],
    correctAnswer: 1,
    explanation: "Site induction provides essential safety information specific to that site and must be completed before starting work."
  },
  {
    id: 170,
    question: "What information should be covered in a site induction?",
    options: [
      "Only emergency procedures",
      "Site layout, hazards, emergency procedures, site rules, welfare facilities",
      "Only site rules",
      "Only welfare facilities"
    ],
    correctAnswer: 1,
    explanation: "Site induction should cover site layout, specific hazards, emergency procedures, site rules and welfare facilities."
  },
  {
    id: 171,
    question: "What is a construction phase plan?",
    options: [
      "A work schedule",
      "Document setting out health and safety arrangements for construction phase",
      "A list of materials needed",
      "A cost estimate"
    ],
    correctAnswer: 1,
    explanation: "The construction phase plan sets out the health and safety arrangements and rules for the construction phase."
  },
  {
    id: 172,
    question: "Who prepares the construction phase plan?",
    options: [
      "Workers",
      "Principal contractor",
      "Client",
      "Designer"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor is responsible for preparing the construction phase plan."
  },
  {
    id: 173,
    question: "What should be included in site welfare facilities?",
    options: [
      "Only toilets",
      "Toilets, washing facilities, drinking water, rest areas, changing rooms",
      "Only drinking water",
      "Only rest areas"
    ],
    correctAnswer: 1,
    explanation: "Welfare facilities should include toilets, washing facilities, drinking water, rest areas and changing rooms."
  },
  {
    id: 174,
    question: "What is the purpose of site security?",
    options: [
      "To prevent theft only",
      "Prevent unauthorised access, protect workers and public, secure materials",
      "To keep workers in",
      "To impress clients"
    ],
    correctAnswer: 1,
    explanation: "Site security prevents unauthorised access, protects workers and the public, and secures materials and equipment."
  },
  {
    id: 175,
    question: "What housekeeping practices improve site safety?",
    options: [
      "Leaving materials everywhere",
      "Clear walkways, proper storage, regular cleaning, waste removal",
      "Only cleaning offices",
      "Ignoring spillages"
    ],
    correctAnswer: 1,
    explanation: "Good housekeeping includes clear walkways, proper material storage, regular cleaning and prompt waste removal."
  },
  {
    id: 176,
    question: "Why is good housekeeping important?",
    options: [
      "For appearance only",
      "Reduces trips, falls, fire risks and improves working conditions",
      "To impress visitors",
      "Not important"
    ],
    correctAnswer: 1,
    explanation: "Good housekeeping reduces trip and fall hazards, fire risks and creates better working conditions."
  },
  {
    id: 177,
    question: "What are the main causes of slips, trips and falls on construction sites?",
    options: [
      "Only wet surfaces",
      "Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear",
      "Only poor lighting",
      "Only wrong footwear"
    ],
    correctAnswer: 1,
    explanation: "Slips, trips and falls result from poor housekeeping, uneven surfaces, inadequate lighting and unsuitable footwear."
  },
  {
    id: 178,
    question: "How can slips, trips and falls be prevented?",
    options: [
      "Only warning signs",
      "Good housekeeping, proper lighting, suitable surfaces, appropriate footwear",
      "Working faster",
      "Only barriers"
    ],
    correctAnswer: 1,
    explanation: "Prevention requires good housekeeping, adequate lighting, suitable walking surfaces and appropriate footwear."
  },
  {
    id: 179,
    question: "What is the purpose of site signage?",
    options: [
      "Decoration",
      "Communicate hazards, restrictions, mandatory requirements, emergency information",
      "Advertising",
      "Entertainment"
    ],
    correctAnswer: 1,
    explanation: "Site signage communicates hazards, restrictions, mandatory requirements and emergency information to all site users."
  },
  {
    id: 180,
    question: "What are the different types of safety signs?",
    options: [
      "Only warning signs",
      "Prohibition, warning, mandatory, emergency, fire safety signs",
      "Only emergency signs",
      "Only prohibition signs"
    ],
    correctAnswer: 1,
    explanation: "Safety signs include prohibition (red), warning (yellow), mandatory (blue), emergency and fire safety signs."
  },
  {
    id: 181,
    question: "What colour are prohibition signs?",
    options: [
      "Yellow",
      "Red",
      "Blue",
      "Green"
    ],
    correctAnswer: 1,
    explanation: "Prohibition signs are red with white pictograms and indicate things that must not be done."
  },
  {
    id: 182,
    question: "What colour are mandatory signs?",
    options: [
      "Red",
      "Yellow",
      "Blue",
      "Green"
    ],
    correctAnswer: 2,
    explanation: "Mandatory signs are blue with white pictograms and indicate actions that must be taken."
  },
  {
    id: 183,
    question: "What colour are warning signs?",
    options: [
      "Red",
      "Yellow",
      "Blue",
      "Green"
    ],
    correctAnswer: 1,
    explanation: "Warning signs are yellow with black pictograms and warn of hazards or dangers."
  },
  {
    id: 184,
    question: "What should be done if you discover unsafe conditions on site?",
    options: [
      "Ignore them",
      "Report immediately to supervisor and make area safe if possible",
      "Continue working",
      "Tell others to avoid the area"
    ],
    correctAnswer: 1,
    explanation: "Unsafe conditions should be reported immediately and the area made safe if possible without creating further risk."
  },
  {
    id: 185,
    question: "What is a toolbox talk?",
    options: [
      "Discussion about tools",
      "Short safety discussion on specific topics relevant to current work",
      "Tool maintenance session",
      "Equipment inspection"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are short, focused safety discussions on topics relevant to current work activities."
  },
  {
    id: 186,
    question: "How often should toolbox talks be held?",
    options: [
      "Never",
      "Regularly, often weekly or before specific high-risk activities",
      "Only annually",
      "Only when accidents occur"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks should be held regularly, often weekly, and before specific high-risk activities."
  },
  {
    id: 187,
    question: "What is the purpose of site inspections?",
    options: [
      "To find fault with workers",
      "Identify hazards, check compliance, monitor safety standards",
      "To waste time",
      "Only for insurance purposes"
    ],
    correctAnswer: 1,
    explanation: "Site inspections identify hazards, check compliance with safety requirements and monitor safety standards."
  },
  {
    id: 188,
    question: "Who should carry out site inspections?",
    options: [
      "Only safety officers",
      "Competent persons including supervisors, safety representatives, managers",
      "Only managers",
      "Only external consultants"
    ],
    correctAnswer: 1,
    explanation: "Site inspections should be carried out by competent persons including supervisors, safety representatives and managers."
  },
  {
    id: 189,
    question: "What should be done with findings from site inspections?",
    options: [
      "File them away",
      "Act on findings, prioritise by risk, monitor progress",
      "Ignore them",
      "Only report to head office"
    ],
    correctAnswer: 1,
    explanation: "Inspection findings should be acted upon, prioritised by risk level and progress monitored until completion."
  },
  {
    id: 190,
    question: "What is the role of the site safety representative?",
    options: [
      "To slow down work",
      "Represent workers on safety matters and investigate concerns",
      "To manage the site",
      "To discipline workers"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives represent workers on safety matters, investigate concerns and participate in consultations."
  },
  {
    id: 191,
    question: "What powers do safety representatives have on site?",
    options: [
      "No special powers",
      "Investigate accidents, inspect workplace, be consulted on safety matters",
      "Stop all work permanently",
      "Dismiss workers"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives can investigate accidents, inspect the workplace and must be consulted on safety matters."
  },
  {
    id: 192,
    question: "What is the importance of communication on construction sites?",
    options: [
      "Not important",
      "Essential for coordination, safety information, emergency response",
      "Only for social purposes",
      "Only for managers"
    ],
    correctAnswer: 1,
    explanation: "Good communication is essential for work coordination, safety information sharing and effective emergency response."
  },
  {
    id: 193,
    question: "How should hazardous substances be stored on site?",
    options: [
      "Anywhere convenient",
      "Secure, ventilated areas with appropriate containment and labelling",
      "With normal materials",
      "Outside only"
    ],
    correctAnswer: 1,
    explanation: "Hazardous substances need secure, well-ventilated storage with appropriate containment and clear labelling."
  },
  {
    id: 194,
    question: "What information should be available for hazardous substances?",
    options: [
      "Only the name",
      "Safety data sheets with hazard information and control measures",
      "Only storage requirements",
      "Only disposal methods"
    ],
    correctAnswer: 1,
    explanation: "Safety data sheets must be available providing hazard information, handling precautions and control measures."
  },
  {
    id: 195,
    question: "What is COSHH?",
    options: [
      "Construction of Safe Houses",
      "Control of Substances Hazardous to Health",
      "Care of Site Health and Hygiene",
      "Construction Safety and Health"
    ],
    correctAnswer: 1,
    explanation: "COSHH stands for Control of Substances Hazardous to Health regulations covering workplace chemical safety."
  },
  {
    id: 196,
    question: "What does a COSHH assessment identify?",
    options: [
      "Only chemical names",
      "Hazardous substances, exposure routes, health effects, control measures",
      "Only storage requirements",
      "Only costs"
    ],
    correctAnswer: 1,
    explanation: "COSHH assessments identify hazardous substances, exposure routes, health effects and necessary control measures."
  },
  {
    id: 197,
    question: "What are the main routes of entry for chemicals into the body?",
    options: [
      "Only through skin",
      "Inhalation, ingestion, skin/eye contact, injection",
      "Only inhalation",
      "Only ingestion"
    ],
    correctAnswer: 1,
    explanation: "Chemicals can enter the body through inhalation, ingestion, skin/eye contact and injection through wounds."
  },
  {
    id: 198,
    question: "What environmental hazards might be found on construction sites?",
    options: [
      "Only noise",
      "Noise, dust, vibration, weather conditions, contaminated ground",
      "Only dust",
      "Only weather"
    ],
    correctAnswer: 1,
    explanation: "Environmental hazards include noise, dust, vibration, adverse weather conditions and contaminated ground."
  },
  {
    id: 199,
    question: "How should environmental hazards be managed?",
    options: [
      "Ignore them",
      "Identify, assess, control through appropriate measures, monitor conditions",
      "They don't affect safety",
      "Only consider them after accidents"
    ],
    correctAnswer: 1,
    explanation: "Environmental hazards should be identified, assessed, controlled through appropriate measures, and conditions monitored."
  },
  {
    id: 200,
    question: "What is the purpose of perimeter fencing on construction sites?",
    options: [
      "Decoration only",
      "Prevent unauthorised access and protect the public from site hazards",
      "Mark property boundaries only",
      "Reduce noise only"
    ],
    correctAnswer: 1,
    explanation: "Perimeter fencing prevents unauthorised access and protects the public from construction hazards."
  },
  {
    id: 201,
    question: "What considerations apply to site access and egress?",
    options: [
      "No special considerations",
      "Safe routes, adequate width, good visibility, emergency access",
      "Cost only",
      "Convenience only"
    ],
    correctAnswer: 1,
    explanation: "Site access must provide safe routes, adequate width, good visibility and maintain emergency access."
  },
  {
    id: 202,
    question: "What is the importance of site planning for safety?",
    options: [
      "Not important for safety",
      "Reduces conflicts between activities, controls access, manages hazards",
      "Only affects productivity",
      "Only important for large sites"
    ],
    correctAnswer: 1,
    explanation: "Good site planning reduces conflicts between activities, controls access routes and helps manage hazards."
  },
  {
    id: 203,
    question: "How should deliveries be managed safely on site?",
    options: [
      "No special procedures needed",
      "Designated areas, trained banksmen, separation from other activities",
      "Allow deliveries anywhere",
      "Only consider vehicle size"
    ],
    correctAnswer: 1,
    explanation: "Safe delivery management requires designated areas, trained banksmen and separation from other site activities."
  },
  {
    id: 204,
    question: "What is the role of a banksman?",
    options: [
      "Handle money",
      "Guide vehicles safely and control vehicle movements",
      "Security guard",
      "Site manager"
    ],
    correctAnswer: 1,
    explanation: "A banksman guides vehicles safely during reversing and manoeuvring operations to prevent accidents."
  },
  {
    id: 205,
    question: "What training should banksmen receive?",
    options: [
      "No training needed",
      "Vehicle movements, hand signals, hazard awareness, communication",
      "Only hand signals",
      "Only vehicle types"
    ],
    correctAnswer: 1,
    explanation: "Banksmen need training in vehicle movements, standard hand signals, hazard awareness and communication."
  },
  {
    id: 206,
    question: "What is the purpose of exclusion zones around plant and machinery?",
    options: [
      "Privacy",
      "Prevent people entering dangerous areas during operation",
      "Noise reduction",
      "Storage space"
    ],
    correctAnswer: 1,
    explanation: "Exclusion zones prevent people entering dangerous areas around operating plant and machinery."
  },
  {
    id: 207,
    question: "How should site traffic and pedestrians be separated?",
    options: [
      "No separation needed",
      "Designated routes, barriers, crossing points, traffic management",
      "Speed limits only",
      "Warning signs only"
    ],
    correctAnswer: 1,
    explanation: "Separation requires designated routes, physical barriers, controlled crossing points and traffic management systems."
  },
  {
    id: 208,
    question: "What weather conditions affect construction site safety?",
    options: [
      "Only rain",
      "High winds, ice, heavy rain, extreme temperatures, lightning",
      "Only snow",
      "Only heat"
    ],
    correctAnswer: 1,
    explanation: "Various weather conditions affect safety including high winds, ice, heavy rain, extreme temperatures and lightning."
  },
  {
    id: 209,
    question: "What precautions should be taken in extreme weather?",
    options: [
      "Continue work as normal",
      "Stop high-risk activities, provide shelter, monitor conditions",
      "Work faster",
      "Only provide warnings"
    ],
    correctAnswer: 1,
    explanation: "Extreme weather may require stopping high-risk activities, providing shelter and continuously monitoring conditions."
  },
  {
    id: 210,
    question: "What is the importance of coordination between different trades on site?",
    options: [
      "Not important",
      "Prevents conflicts, ensures compatible working methods, manages shared risks",
      "Only for scheduling",
      "Only for cost control"
    ],
    correctAnswer: 1,
    explanation: "Trade coordination prevents conflicts, ensures compatible working methods and manages risks affecting multiple trades."
  },

  // Section 6: Fire Safety and Emergency Procedures (Questions 211-250)
  {
    id: 211,
    question: "What are the three elements needed for fire (fire triangle)?",
    options: [
      "Heat, fuel, and water",
      "Heat, fuel, and oxygen",
      "Fuel, oxygen, and carbon dioxide",
      "Heat, oxygen, and nitrogen"
    ],
    correctAnswer: 1,
    explanation: "Fire requires three elements: heat (ignition source), fuel (combustible material), and oxygen to sustain combustion."
  },
  {
    id: 212,
    question: "How can fires be prevented?",
    options: [
      "Only by removing heat",
      "Remove or control any element of the fire triangle",
      "Only by removing fuel",
      "Only by removing oxygen"
    ],
    correctAnswer: 1,
    explanation: "Fire prevention involves removing or controlling heat sources, fuel sources, or oxygen supply."
  },
  {
    id: 213,
    question: "What are the main classes of fire?",
    options: [
      "Only Class A",
      "Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)",
      "Only Class A and B",
      "Class 1, 2, 3"
    ],
    correctAnswer: 1,
    explanation: "Fire classes are: A (ordinary combustibles), B (flammable liquids), C (gases), D (metals), F (cooking oils)."
  },
  {
    id: 214,
    question: "What type of fire extinguisher should be used on Class A fires?",
    options: [
      "CO2 only",
      "Water, foam, or dry powder",
      "Wet chemical only",
      "Never use extinguishers"
    ],
    correctAnswer: 1,
    explanation: "Class A fires (ordinary combustibles) can be extinguished with water, foam, or dry powder extinguishers."
  },
  {
    id: 215,
    question: "What type of fire extinguisher should be used on electrical fires?",
    options: [
      "Water",
      "CO2 or dry powder",
      "Foam",
      "Wet chemical"
    ],
    correctAnswer: 1,
    explanation: "CO2 or dry powder extinguishers should be used on electrical fires as they don't conduct electricity."
  },
  {
    id: 216,
    question: "Why should water never be used on electrical fires?",
    options: [
      "It's ineffective",
      "Water conducts electricity and can cause electrocution",
      "It's too expensive",
      "It damages equipment"
    ],
    correctAnswer: 1,
    explanation: "Water conducts electricity and using it on live electrical equipment can cause electrocution."
  },
  {
    id: 217,
    question: "What should you do if you discover a fire?",
    options: [
      "Try to fight it yourself",
      "Raise the alarm, call fire brigade, evacuate if safe to do so",
      "Ignore small fires",
      "Wait to see if it spreads"
    ],
    correctAnswer: 1,
    explanation: "On discovering fire: raise the alarm, call fire brigade, and evacuate safely - only tackle small fires if trained and safe."
  },
  {
    id: 218,
    question: "What does PASS stand for in fire extinguisher use?",
    options: [
      "Point, Aim, Squeeze, Sweep",
      "Pull, Aim, Squeeze, Sweep",
      "Pull, Aim, Shoot, Stop",
      "Point, Activate, Spray, Stop"
    ],
    correctAnswer: 1,
    explanation: "PASS: Pull the pin, Aim at base of fire, Squeeze the handle, Sweep from side to side."
  },
  {
    id: 219,
    question: "When should you attempt to fight a fire?",
    options: [
      "Always fight fires",
      "Only if small, you're trained, have escape route, and feel confident",
      "Never fight fires",
      "Only if expensive equipment is involved"
    ],
    correctAnswer: 1,
    explanation: "Only fight fires if they're small, you're trained, have a clear escape route, and feel confident doing so."
  },
  {
    id: 220,
    question: "What is the most important principle in fire evacuation?",
    options: [
      "Save property",
      "Save lives - people before property",
      "Save expensive equipment",
      "Save documents"
    ],
    correctAnswer: 1,
    explanation: "Life safety is paramount - people must be evacuated before considering property or equipment."
  },
  {
    id: 221,
    question: "What should you do when the fire alarm sounds?",
    options: [
      "Finish what you're doing first",
      "Stop work immediately and evacuate via nearest safe exit",
      "Wait for instructions",
      "Check if it's a drill first"
    ],
    correctAnswer: 1,
    explanation: "When fire alarms sound, stop work immediately and evacuate via the nearest safe exit route."
  },
  {
    id: 222,
    question: "Where should people assemble during evacuation?",
    options: [
      "Near the building",
      "At designated assembly points away from the building",
      "In car parks",
      "At the site entrance"
    ],
    correctAnswer: 1,
    explanation: "People should assemble at designated assembly points that are a safe distance from the building."
  },
  {
    id: 223,
    question: "Who should take a roll call at assembly points?",
    options: [
      "Anyone",
      "Fire wardens or designated responsible persons",
      "The fire brigade",
      "Security guards"
    ],
    correctAnswer: 1,
    explanation: "Fire wardens or other designated responsible persons should conduct roll calls to account for all personnel."
  },
  {
    id: 224,
    question: "What information should be given to the fire brigade?",
    options: [
      "Only the address",
      "Location, type of fire, people involved, hazardous materials present",
      "Only the time",
      "Only the building owner's name"
    ],
    correctAnswer: 1,
    explanation: "Fire brigade should be told: exact location, type of fire, people involved/missing, and any hazardous materials."
  },
  {
    id: 225,
    question: "What is a fire risk assessment?",
    options: [
      "Cost of fire damage",
      "Systematic evaluation of fire hazards and risks to implement control measures",
      "Fire drill practice",
      "Insurance evaluation"
    ],
    correctAnswer: 1,
    explanation: "Fire risk assessment systematically evaluates fire hazards and risks to implement appropriate prevention and protection measures."
  },
  {
    id: 226,
    question: "What should a fire risk assessment identify?",
    options: [
      "Only fire exits",
      "Fire hazards, people at risk, control measures needed",
      "Only fire extinguishers",
      "Only alarm systems"
    ],
    correctAnswer: 1,
    explanation: "Fire risk assessments should identify fire hazards, people at risk, and determine necessary control measures."
  },
  {
    id: 227,
    question: "How often should fire drills be conducted?",
    options: [
      "Never",
      "Regularly, typically every 6 months or as required",
      "Only annually",
      "Only when new staff start"
    ],
    correctAnswer: 1,
    explanation: "Fire drills should be conducted regularly, typically every 6 months, to ensure evacuation procedures work effectively."
  },
  {
    id: 228,
    question: "What should be checked during fire drill evaluation?",
    options: [
      "Only evacuation time",
      "Evacuation time, route effectiveness, alarm audibility, assembly procedures",
      "Only alarm systems",
      "Only fire warden performance"
    ],
    correctAnswer: 1,
    explanation: "Evaluate evacuation times, route effectiveness, alarm audibility, assembly procedures and overall drill effectiveness."
  },
  {
    id: 229,
    question: "What are the key components of emergency evacuation routes?",
    options: [
      "Only stairs",
      "Clearly marked, well-lit, unobstructed, leading to safe areas",
      "Only doors",
      "Only signs"
    ],
    correctAnswer: 1,
    explanation: "Evacuation routes must be clearly marked, well-lit, kept unobstructed, and lead to safe areas outside."
  },
  {
    id: 230,
    question: "What is the role of fire wardens?",
    options: [
      "Fight all fires",
      "Assist with evacuation, check areas are clear, liaise with fire brigade",
      "Only sound alarms",
      "Only check fire extinguishers"
    ],
    correctAnswer: 1,
    explanation: "Fire wardens assist evacuation, check their areas are clear, help colleagues and liaise with emergency services."
  },
  {
    id: 231,
    question: "What training should fire wardens receive?",
    options: [
      "No training needed",
      "Fire procedures, evacuation routes, equipment use, emergency communication",
      "Only fire extinguisher use",
      "Only first aid"
    ],
    correctAnswer: 1,
    explanation: "Fire wardens need training in fire procedures, evacuation routes, equipment use and emergency communication."
  },
  {
    id: 232,
    question: "What should you do if you're trapped by fire?",
    options: [
      "Try to run through flames",
      "Close doors, signal for help, stay low, await rescue",
      "Hide in cupboards",
      "Break windows immediately"
    ],
    correctAnswer: 1,
    explanation: "If trapped: close doors to slow fire spread, signal for help, stay low to avoid smoke, and await rescue."
  },
  {
    id: 233,
    question: "Why should you stay low in smoke?",
    options: [
      "To hide from fire",
      "Cleaner air is near the floor as smoke rises",
      "To crawl under flames",
      "To avoid heat only"
    ],
    correctAnswer: 1,
    explanation: "Smoke rises, so cleaner, cooler air with more oxygen is found closer to the floor."
  },
  {
    id: 234,
    question: "What is the main danger from smoke?",
    options: [
      "Poor visibility only",
      "Toxic gases that can cause unconsciousness and death",
      "Staining clothes",
      "Irritating eyes"
    ],
    correctAnswer: 1,
    explanation: "Smoke contains toxic gases like carbon monoxide that can cause unconsciousness and death within minutes."
  },
  {
    id: 235,
    question: "What emergency equipment should be available on construction sites?",
    options: [
      "Only fire extinguishers",
      "Fire extinguishers, first aid kits, emergency communication, evacuation equipment",
      "Only first aid kits",
      "Only phones"
    ],
    correctAnswer: 1,
    explanation: "Sites should have fire extinguishers, first aid equipment, emergency communication means and evacuation equipment."
  },
  {
    id: 236,
    question: "What is a fire safety management system?",
    options: [
      "Just fire extinguishers",
      "Comprehensive approach including prevention, detection, suppression, evacuation",
      "Only alarm systems",
      "Only escape routes"
    ],
    correctAnswer: 1,
    explanation: "Fire safety management includes prevention measures, detection systems, suppression equipment and evacuation procedures."
  },
  {
    id: 237,
    question: "How should hot work be controlled to prevent fires?",
    options: [
      "No special controls needed",
      "Permits, fire watches, cleared areas, fire extinguishers nearby",
      "Work faster",
      "Only warning signs"
    ],
    correctAnswer: 1,
    explanation: "Hot work requires permits, trained fire watches, cleared work areas and appropriate fire extinguishers nearby."
  },
  {
    id: 238,
    question: "What is a fire watch?",
    options: [
      "A type of alarm",
      "Person monitoring for fires during and after hot work",
      "Security guard",
      "Fire prevention officer"
    ],
    correctAnswer: 1,
    explanation: "A fire watch is a trained person who monitors for fires during hot work and for a period afterwards."
  },
  {
    id: 239,
    question: "What should be done with combustible materials during hot work?",
    options: [
      "Leave them in place",
      "Remove or protect them from ignition",
      "Wet them only",
      "Cover with plastic"
    ],
    correctAnswer: 1,
    explanation: "Combustible materials should be removed from the area or properly protected from ignition sources."
  },
  {
    id: 240,
    question: "What emergency communication systems should sites have?",
    options: [
      "Only mobile phones",
      "Multiple methods: landline, mobile, radio, alarms",
      "Only landlines",
      "Only radios"
    ],
    correctAnswer: 1,
    explanation: "Sites should have multiple communication methods including landlines, mobiles, radios and alarm systems."
  },
  {
    id: 241,
    question: "What information should be immediately available in emergencies?",
    options: [
      "Only site plans",
      "Emergency contacts, site plans, hazard information, evacuation procedures",
      "Only phone numbers",
      "Only evacuation routes"
    ],
    correctAnswer: 1,
    explanation: "Emergency information should include contacts, site plans, hazard details and evacuation procedures."
  },
  {
    id: 242,
    question: "How should emergency procedures be communicated?",
    options: [
      "Verbal instructions only",
      "Training, written procedures, drills, signs, induction",
      "Posters only",
      "Word of mouth"
    ],
    correctAnswer: 1,
    explanation: "Emergency procedures should be communicated through training, written procedures, drills, signage and induction."
  },
  {
    id: 243,
    question: "What is the purpose of emergency lighting?",
    options: [
      "Save electricity",
      "Provide illumination during power failures for safe evacuation",
      "Decoration",
      "Security"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting provides illumination during power failures to enable safe evacuation along escape routes."
  },
  {
    id: 244,
    question: "How often should emergency lighting be tested?",
    options: [
      "Never",
      "Monthly brief tests and annual full duration tests",
      "Only when it fails",
      "Only annually"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting should be tested monthly for operation and annually for full duration capability."
  },
  {
    id: 245,
    question: "What should be included in emergency evacuation plans?",
    options: [
      "Only escape routes",
      "Routes, assembly points, responsibilities, special needs, communication methods",
      "Only assembly points",
      "Only alarm locations"
    ],
    correctAnswer: 1,
    explanation: "Plans should include escape routes, assembly points, responsibilities, provisions for special needs and communication."
  },
  {
    id: 246,
    question: "How should people with disabilities be considered in emergency planning?",
    options: [
      "No special consideration needed",
      "Personal emergency evacuation plans and assistance arrangements",
      "They cannot be evacuated",
      "Only exit route planning"
    ],
    correctAnswer: 1,
    explanation: "People with disabilities need personal emergency evacuation plans with specific assistance arrangements."
  },
  {
    id: 247,
    question: "What should be done after an emergency evacuation?",
    options: [
      "Return immediately",
      "Account for all personnel, investigate cause, debrief, improve procedures",
      "Go home",
      "Continue work elsewhere"
    ],
    correctAnswer: 1,
    explanation: "After evacuation: account for personnel, investigate the cause, conduct debriefing and improve procedures."
  },
  {
    id: 248,
    question: "What is business continuity planning?",
    options: [
      "Marketing strategy",
      "Planning to maintain operations during and after emergencies",
      "Financial planning",
      "Staff development"
    ],
    correctAnswer: 1,
    explanation: "Business continuity planning ensures operations can continue during emergencies and recovery afterwards."
  },
  {
    id: 249,
    question: "What should be included in emergency training?",
    options: [
      "Only theory",
      "Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks",
      "Only evacuation routes",
      "Only equipment use"
    ],
    correctAnswer: 1,
    explanation: "Training should cover alarm procedures, evacuation routes, assembly points, equipment use, and site-specific risks."
  },
  {
    id: 250,
    question: "How often should emergency procedures be reviewed and updated?",
    options: [
      "Never",
      "Regularly, after incidents, when changes occur to site or operations",
      "Only annually",
      "Only when regulations change"
    ],
    correctAnswer: 1,
    explanation: "Emergency procedures should be reviewed regularly, after incidents, and when changes occur to the site or operations."
  }
];

// Function to get random questions for mock exam
export const getRandomQuestions = (count: number = 30): Question[] => {
  const shuffled = [...module1Questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};