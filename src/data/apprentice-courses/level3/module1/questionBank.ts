// Level 3 Module 1: Health and Safety at Work - Question Bank
// 200 advanced questions covering all Module 1 content for Level 3 Electrical Course
// Topics: HASAWA, EAWR, RIDDOR, COSHH, Risk Assessment, Method Statements, PPE, Safe Isolation

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module1Questions: Question[] = [
  // ============================================
  // Section 1.1: HASAWA 1974 (Questions 1-30)
  // ============================================
  {
    id: 1,
    question: "Under Section 2 of HASAWA 1974, what is the employer's general duty?",
    options: [
      "To provide free PPE to all visitors",
      "To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees",
      "To employ only qualified electricians",
      "To report all accidents to the police"
    ],
    correctAnswer: 1,
    explanation: "Section 2 of HASAWA 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "What does 'so far as is reasonably practicable' mean under HASAWA?",
    options: [
      "The employer must eliminate all risks regardless of cost",
      "The employer must weigh the risk against the cost, time and effort of removing it",
      "The employer only needs to follow manufacturer guidelines",
      "The employer must only comply if specifically requested"
    ],
    correctAnswer: 1,
    explanation: "Reasonably practicable means weighing the degree of risk against the cost (in money, time, and trouble) needed to avert it. If disproportion exists, it's not reasonably practicable.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 3,
    question: "Under Section 3 of HASAWA, employers have duties to whom?",
    options: [
      "Employees only",
      "Shareholders only",
      "Non-employees who may be affected by the work activities",
      "Local authority inspectors only"
    ],
    correctAnswer: 2,
    explanation: "Section 3 requires employers to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that non-employees are not exposed to risks to their health or safety.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 4,
    question: "Which section of HASAWA deals with employees' duties?",
    options: [
      "Section 2",
      "Section 5",
      "Section 7",
      "Section 9"
    ],
    correctAnswer: 2,
    explanation: "Section 7 of HASAWA 1974 sets out the duties of employees - to take reasonable care and to cooperate with their employer on health and safety matters.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 5,
    question: "What is prohibited under Section 8 of HASAWA?",
    options: [
      "Working alone",
      "Working without supervision",
      "Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare",
      "Using non-approved equipment"
    ],
    correctAnswer: 2,
    explanation: "Section 8 makes it an offence to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 6,
    question: "Under HASAWA, what document must employers with 5 or more employees have?",
    options: [
      "Business plan",
      "Written health and safety policy",
      "Equipment register",
      "Staff handbook"
    ],
    correctAnswer: 1,
    explanation: "Employers with 5 or more employees must prepare and revise a written statement of their general health and safety policy and bring it to the attention of employees.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 7,
    question: "What enforcement powers does an HSE inspector have under HASAWA?",
    options: [
      "Only to give verbal warnings",
      "To issue improvement notices, prohibition notices, and prosecute",
      "Only to recommend improvements",
      "Only to close businesses permanently"
    ],
    correctAnswer: 1,
    explanation: "HSE inspectors can issue improvement notices (requiring improvements within a timeframe), prohibition notices (stopping activities immediately), and prosecute for breaches.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What is the difference between an improvement notice and a prohibition notice?",
    options: [
      "There is no difference",
      "Improvement notices stop work immediately; prohibition notices give time to comply",
      "Improvement notices give time to remedy a contravention; prohibition notices stop activities involving serious risk immediately",
      "Prohibition notices are only for minor issues"
    ],
    correctAnswer: 2,
    explanation: "Improvement notices require contraventions to be remedied within a specified time. Prohibition notices stop dangerous activities immediately until the risk is removed.",
    section: "1.1",
    difficulty: "advanced"
  },
  {
    id: 9,
    question: "What is the maximum fine for health and safety offences in the Crown Court?",
    options: [
      "£5,000",
      "£20,000",
      "£50,000",
      "Unlimited"
    ],
    correctAnswer: 3,
    explanation: "For offences heard in the Crown Court, there is no limit on the fine that can be imposed. Imprisonment is also possible for certain offences.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 10,
    question: "Under HASAWA, who can be held personally liable for health and safety offences?",
    options: [
      "Only the company",
      "Only the managing director",
      "Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect",
      "Only the health and safety officer"
    ],
    correctAnswer: 2,
    explanation: "Section 37 allows prosecution of directors, managers, secretaries or similar officers where the body corporate's offence is attributable to their consent, connivance or neglect.",
    section: "1.1",
    difficulty: "advanced"
  },
  {
    id: 11,
    question: "What information must employers provide to employees under Section 2 of HASAWA?",
    options: [
      "Only emergency contact numbers",
      "Information, instruction, training and supervision necessary for health and safety",
      "Only the company's financial information",
      "Only information about their pension"
    ],
    correctAnswer: 1,
    explanation: "Section 2(2)(c) requires employers to provide information, instruction, training and supervision necessary to ensure health and safety of employees.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 12,
    question: "What does Section 4 of HASAWA cover?",
    options: [
      "Employee duties",
      "Self-employed duties",
      "Duties of persons concerned with premises to persons other than their employees",
      "Duties of manufacturers"
    ],
    correctAnswer: 2,
    explanation: "Section 4 places duties on those in control of premises to ensure the premises and plant/substances are safe for non-employees using them.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "Who enforces health and safety law in most electrical contracting workplaces?",
    options: [
      "Local authority environmental health officers",
      "The Health and Safety Executive (HSE)",
      "The police",
      "The fire service"
    ],
    correctAnswer: 1,
    explanation: "The HSE enforces health and safety law in most industrial and construction workplaces, including electrical contracting sites.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 14,
    question: "What is a 'competent person' under health and safety legislation?",
    options: [
      "Anyone who has attended a first aid course",
      "A person with sufficient training, knowledge, experience and other qualities to properly assist",
      "Only someone with a university degree",
      "The most senior employee"
    ],
    correctAnswer: 1,
    explanation: "A competent person has sufficient training, experience, knowledge and other qualities to enable them to assist with health and safety measures.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 15,
    question: "What must employers consult with employees about under HASAWA?",
    options: [
      "Only pay and conditions",
      "Measures affecting health and safety, including arrangements for competent assistance",
      "Only holiday arrangements",
      "Only pension contributions"
    ],
    correctAnswer: 1,
    explanation: "Employers must consult employees or their representatives on health and safety matters, including measures affecting them and arrangements for competent health and safety assistance.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 16,
    question: "Under HASAWA, what are the duties of manufacturers and suppliers of articles for use at work?",
    options: [
      "No specific duties apply",
      "Only to provide a warranty",
      "To ensure articles are safe, tested, and accompanied by adequate information",
      "Only to provide a receipt"
    ],
    correctAnswer: 2,
    explanation: "Section 6 requires manufacturers/suppliers to ensure articles and substances are safe, properly tested, and accompanied by adequate information for safe use.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "What is the purpose of a health and safety policy statement?",
    options: [
      "To satisfy insurance requirements only",
      "To set out the organisation's commitment and arrangements for managing health and safety",
      "To list all employees",
      "To record accidents only"
    ],
    correctAnswer: 1,
    explanation: "The health and safety policy statement sets out the employer's general approach, commitment and arrangements for managing health and safety in the organisation.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 18,
    question: "What three parts should a health and safety policy contain?",
    options: [
      "Introduction, middle, and conclusion",
      "Statement of intent, organisation, and arrangements",
      "Risk assessment, method statement, and permit",
      "Names, addresses, and phone numbers"
    ],
    correctAnswer: 1,
    explanation: "A health and safety policy should contain: (1) Statement of intent - general policy, (2) Organisation - responsibilities, and (3) Arrangements - practical implementation.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "How often should a health and safety policy be reviewed?",
    options: [
      "Only when there's an accident",
      "Every 10 years",
      "Regularly and whenever there are significant changes",
      "Never - once written it's permanent"
    ],
    correctAnswer: 2,
    explanation: "The policy should be reviewed regularly (at least annually) and whenever there are significant changes to the business, processes, or legislation.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 20,
    question: "What is 'vicarious liability' in health and safety?",
    options: [
      "Liability for accidents caused by visitors",
      "An employer's liability for acts or omissions of their employees performed in the course of employment",
      "Liability for defective equipment",
      "Liability for natural disasters"
    ],
    correctAnswer: 1,
    explanation: "Vicarious liability means employers can be held liable for the negligent acts or omissions of their employees when performed in the course of their employment.",
    section: "1.1",
    difficulty: "advanced"
  },
  {
    id: 21,
    question: "Under HASAWA, what must employees NOT do?",
    options: [
      "Report hazards to their supervisor",
      "Use safety equipment provided",
      "Charge their employer for safety equipment or training",
      "Follow safe working procedures"
    ],
    correctAnswer: 2,
    explanation: "Section 9 of HASAWA states that no employer shall charge any employee for anything done or provided to comply with health and safety requirements.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 22,
    question: "What is the 'hierarchy of control' in health and safety?",
    options: [
      "The management structure of a company",
      "A prioritised approach: eliminate, substitute, engineering controls, administrative controls, PPE",
      "The order in which to evacuate a building",
      "The ranking of employees by seniority"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control prioritises: elimination of hazard, substitution with less hazardous, engineering controls, administrative controls, and PPE as a last resort.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 23,
    question: "What does 'due diligence' mean in health and safety?",
    options: [
      "Taking all reasonable precautions to prevent harm and demonstrating this",
      "Following insurance requirements",
      "Hiring a safety officer",
      "Having a written policy only"
    ],
    correctAnswer: 0,
    explanation: "Due diligence means taking all reasonable precautions to avoid committing an offence and being able to demonstrate this through records and actions.",
    section: "1.1",
    difficulty: "advanced"
  },
  {
    id: 24,
    question: "What is a Safety Representative?",
    options: [
      "A government inspector",
      "An employee appointed by a recognised trade union to represent employees on health and safety matters",
      "The company director",
      "An insurance assessor"
    ],
    correctAnswer: 1,
    explanation: "A Safety Representative is appointed by a recognised trade union to represent employees in consultations with the employer on health and safety matters.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 25,
    question: "What functions can a Safety Representative perform?",
    options: [
      "Only attend meetings",
      "Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information",
      "Only write reports",
      "Only order equipment"
    ],
    correctAnswer: 1,
    explanation: "Safety Representatives can investigate hazards, complaints, and accidents; inspect the workplace; represent employees in consultations; and receive information from inspectors.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 26,
    question: "What is a Health and Safety Committee?",
    options: [
      "A government body",
      "A committee where employers and employee representatives discuss and review health and safety measures",
      "A group of external consultants",
      "An insurance panel"
    ],
    correctAnswer: 1,
    explanation: "A Health and Safety Committee is a joint body where employers and employee representatives meet to discuss, review, and improve health and safety measures.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 27,
    question: "When must an employer establish a Health and Safety Committee?",
    options: [
      "Always required by law",
      "When requested in writing by two or more Safety Representatives",
      "Only in factories",
      "Only if there's been an accident"
    ],
    correctAnswer: 1,
    explanation: "Under the Safety Representatives Regulations 1977, employers must establish a Health and Safety Committee if requested in writing by two or more Safety Representatives.",
    section: "1.1",
    difficulty: "advanced"
  },
  {
    id: 28,
    question: "What does the term 'statutory duty' mean?",
    options: [
      "A voluntary guideline",
      "A legal requirement imposed by an Act of Parliament or Regulations",
      "A recommendation from HSE",
      "A company policy"
    ],
    correctAnswer: 1,
    explanation: "A statutory duty is a legal requirement imposed by law (Acts of Parliament or Regulations). Failure to comply can result in prosecution.",
    section: "1.1",
    difficulty: "basic"
  },
  {
    id: 29,
    question: "What is an Approved Code of Practice (ACoP)?",
    options: [
      "A legal requirement with criminal penalties",
      "Guidance with special legal status - failure to follow can be used as evidence of non-compliance",
      "An optional company guideline",
      "A training certificate"
    ],
    correctAnswer: 1,
    explanation: "An ACoP provides practical guidance on how to comply with the law. While not legally binding, failure to follow an ACoP can be used as evidence of non-compliance.",
    section: "1.1",
    difficulty: "intermediate"
  },
  {
    id: 30,
    question: "What is the difference between absolute and qualified duties under HASAWA?",
    options: [
      "There is no difference",
      "Absolute duties must be complied with; qualified duties are subject to 'reasonably practicable'",
      "Absolute duties are optional; qualified duties are mandatory",
      "Both are merely recommendations"
    ],
    correctAnswer: 1,
    explanation: "Absolute duties (using 'shall' or 'must') must be complied with regardless of cost. Qualified duties require compliance 'so far as is reasonably practicable'.",
    section: "1.1",
    difficulty: "advanced"
  },

  // ============================================
  // Section 1.2: EAWR 1989 (Questions 31-55)
  // ============================================
  {
    id: 31,
    question: "What is the full title of EAWR 1989?",
    options: [
      "Electrical Appliances Work Regulations",
      "Electricity at Work Regulations 1989",
      "Electrical Assessment and Working Regulations",
      "Electronic and Wiring Regulations"
    ],
    correctAnswer: 1,
    explanation: "EAWR 1989 is the Electricity at Work Regulations 1989, which specifically addresses electrical safety in the workplace.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 32,
    question: "What does Regulation 3 of EAWR specify?",
    options: [
      "Working hours",
      "Duties to comply with regulations to prevent danger and injury from electricity",
      "Payment terms",
      "Training requirements only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 imposes duties on employers, employees, and self-employed to comply with the regulations to prevent danger and injury from electricity.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 33,
    question: "Under EAWR, what does 'danger' mean?",
    options: [
      "Only risk of electric shock",
      "Risk of injury from electric shock, burns, fire, or explosion arising from electricity",
      "Only risk of fire",
      "Only risk to property"
    ],
    correctAnswer: 1,
    explanation: "Under EAWR, 'danger' means risk of injury from electric shock, electrical burns, fires of electrical origin, or electric arcing and explosion.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 34,
    question: "What does Regulation 4 of EAWR require?",
    options: [
      "All systems shall be constructed to prevent danger so far as is reasonably practicable",
      "All workers must be qualified electricians",
      "All equipment must be new",
      "All work must be done during daylight"
    ],
    correctAnswer: 0,
    explanation: "Regulation 4 requires that all electrical systems shall be constructed and maintained so as to prevent danger, so far as is reasonably practicable.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 35,
    question: "What does Regulation 12 of EAWR cover?",
    options: [
      "Working hours",
      "Means for cutting off supply and isolation",
      "Payment for work",
      "Apprenticeship requirements"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12 requires that suitable means (including, where appropriate, methods of identifying circuits) are provided for cutting off supply and for isolation.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 36,
    question: "What does Regulation 13 of EAWR require regarding isolation?",
    options: [
      "That supply can be switched off remotely",
      "That adequate precautions are taken to prevent reconnection during work",
      "That only fuses are used",
      "That isolation is optional"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 requires that adequate precautions shall be taken to prevent electrical equipment from being electrically charged during work where this could cause danger.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 37,
    question: "What does Regulation 14 of EAWR state about live working?",
    options: [
      "Live working is always permitted",
      "Live working is always prohibited",
      "No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken",
      "Live working requires only verbal permission"
    ],
    correctAnswer: 2,
    explanation: "Regulation 14 prohibits live working unless: (a) unreasonable to make dead, (b) reasonable to work live, and (c) suitable precautions taken to prevent injury.",
    section: "1.2",
    difficulty: "advanced"
  },
  {
    id: 38,
    question: "Under EAWR Regulation 16, what standard of competence is required?",
    options: [
      "No specific standard",
      "Technical knowledge and experience to prevent danger and injury",
      "University degree only",
      "5 years' experience minimum"
    ],
    correctAnswer: 1,
    explanation: "Regulation 16 requires that no person shall engage in work activity where technical knowledge or experience is necessary unless they possess it or are appropriately supervised.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 39,
    question: "What does EAWR Regulation 5 require for electrical equipment strength and capability?",
    options: [
      "Equipment should be cheap",
      "Equipment shall be of sufficient strength and capability for its purpose",
      "Equipment must be imported",
      "Equipment must be replaced annually"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 requires that electrical equipment shall be of such construction as to be suitable for its intended use and conditions, with sufficient strength and capability.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 40,
    question: "What does Regulation 6 of EAWR require regarding adverse conditions?",
    options: [
      "Work only in ideal conditions",
      "Equipment must be suitable for adverse or hazardous environments or adequately protected",
      "Cancel work if conditions change",
      "Use domestic equipment everywhere"
    ],
    correctAnswer: 1,
    explanation: "Regulation 6 requires electrical equipment exposed to adverse or hazardous environments to be constructed or protected to prevent danger from such exposure.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 41,
    question: "What does Regulation 7 of EAWR cover?",
    options: [
      "Working time",
      "Insulation, protection and placing of conductors",
      "Employee pay",
      "Company registration"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 requires all conductors to be either suitably insulated and protected, or placed to prevent danger, or both.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 42,
    question: "What earthing requirements does Regulation 8 of EAWR specify?",
    options: [
      "Earthing is optional",
      "Suitable precautions shall be taken to prevent danger from charge on exposed metalwork, preferably by earthing",
      "Only metal equipment needs earthing",
      "Earthing only applies to industrial settings"
    ],
    correctAnswer: 1,
    explanation: "Regulation 8 requires precautions including earthing or other suitable means to prevent danger arising from a conductor (other than a circuit conductor) becoming charged.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 43,
    question: "What does Regulation 9 of EAWR require about circuit integrity?",
    options: [
      "Circuits can have any configuration",
      "Joints and connections must be properly made to be mechanically and electrically sound",
      "All circuits must be temporary",
      "Circuits don't need testing"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9 requires that all joints and connections in a system shall be mechanically and electrically suitable for use.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 44,
    question: "What protection against excess current does Regulation 10 require?",
    options: [
      "No protection required",
      "Every part of a system shall be protected from excess current",
      "Only main cables need protection",
      "Protection is optional in domestic settings"
    ],
    correctAnswer: 1,
    explanation: "Regulation 10 requires that every part of a system shall be protected from excess current as may be necessary to prevent danger.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 45,
    question: "What does Regulation 11 of EAWR require for means of protection?",
    options: [
      "Any fuse will do",
      "Suitable means shall be available for protecting from excess current and for cutting off supply in an emergency",
      "Protection devices are optional",
      "Only circuit breakers allowed"
    ],
    correctAnswer: 1,
    explanation: "Regulation 11 requires suitable means readily accessible for protecting from excess current and for cutting off supply in an emergency.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 46,
    question: "What does 'dead working' mean under EAWR?",
    options: [
      "Working while tired",
      "Working on electrical systems that have been safely isolated from all sources of supply",
      "Working underground",
      "Working at night"
    ],
    correctAnswer: 1,
    explanation: "Dead working means working on electrical equipment or systems that have been properly isolated from all sources of electrical supply and proven dead.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 47,
    question: "What must be done before starting electrical work under EAWR?",
    options: [
      "Notify the HSE",
      "Identify the circuit, isolate, secure isolation, prove dead, and apply necessary safeguards",
      "Just switch off at the socket",
      "Ask a colleague to watch"
    ],
    correctAnswer: 1,
    explanation: "Before starting work: identify the circuit, isolate from supply, secure the isolation, prove the circuit dead with a voltage indicator, and apply necessary safeguards.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 48,
    question: "According to EAWR, what constitutes a 'system'?",
    options: [
      "Only the main distribution board",
      "An electrical system including source of energy, conductors, and load equipment",
      "Only portable equipment",
      "Only fixed wiring"
    ],
    correctAnswer: 1,
    explanation: "Under EAWR, a 'system' means an electrical system in which all the electrical equipment is, or may be, electrically connected to a common source of electrical energy.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 49,
    question: "Who do the Electricity at Work Regulations apply to?",
    options: [
      "Only electricians",
      "Only employers",
      "All employers, employees, and self-employed persons who work with or near electricity",
      "Only factories"
    ],
    correctAnswer: 2,
    explanation: "EAWR applies to employers, employees, and self-employed persons in relation to matters within their control regarding work activities where danger may arise from electricity.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 50,
    question: "What is the defence available under EAWR for qualified duties?",
    options: [
      "Financial hardship",
      "All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence",
      "Being unaware of the regulations",
      "Following verbal instructions"
    ],
    correctAnswer: 1,
    explanation: "For regulations qualified by 'reasonably practicable', it is a defence to prove all reasonable steps were taken and all due diligence exercised.",
    section: "1.2",
    difficulty: "advanced"
  },
  {
    id: 51,
    question: "Under EAWR, what voltage is considered 'low voltage'?",
    options: [
      "Below 50V",
      "Exceeding 50V AC or 120V DC but not exceeding 1000V AC or 1500V DC",
      "Below 12V only",
      "Any voltage from a battery"
    ],
    correctAnswer: 1,
    explanation: "Low voltage means exceeding 50V AC or 120V DC ripple-free but not exceeding 1000V AC or 1500V DC between conductors, or 600V AC or 900V DC to earth.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 52,
    question: "What test equipment requirements apply under EAWR?",
    options: [
      "Any equipment can be used",
      "Equipment must be suitable for the purpose, properly maintained, and used by competent persons",
      "Only branded equipment allowed",
      "Equipment doesn't need calibration"
    ],
    correctAnswer: 1,
    explanation: "Test equipment must be suitable for the purpose, properly constructed and maintained, and used by persons with adequate knowledge and experience.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 53,
    question: "What does the HSE Guidance Note GS38 cover?",
    options: [
      "Cable installation",
      "Safe use of electrical test equipment",
      "Building regulations",
      "Fire safety"
    ],
    correctAnswer: 1,
    explanation: "GS38 provides guidance on the selection, use, and maintenance of electrical test equipment to protect against electric shock.",
    section: "1.2",
    difficulty: "basic"
  },
  {
    id: 54,
    question: "According to GS38, what features must test probes have?",
    options: [
      "Long exposed metal tips",
      "Finger barriers, insulated tips with maximum 4mm exposed, and HRC fused leads",
      "Bare metal handles",
      "No specific requirements"
    ],
    correctAnswer: 1,
    explanation: "GS38 specifies probes must have finger barriers, insulated tips with maximum 4mm exposed metal, spring-loaded retractable sheaths, and HRC fused leads.",
    section: "1.2",
    difficulty: "intermediate"
  },
  {
    id: 55,
    question: "What does EAWR Regulation 15 cover?",
    options: [
      "Working hours",
      "Working space, access, and lighting",
      "Payment terms",
      "Holiday entitlement"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15 requires adequate working space, means of access, and lighting for all electrical work to be carried out safely.",
    section: "1.2",
    difficulty: "basic"
  },

  // ============================================
  // Section 1.3: RIDDOR (Questions 56-80)
  // ============================================
  {
    id: 56,
    question: "What does RIDDOR stand for?",
    options: [
      "Reporting of Industrial Diseases and Dangerous Occurrences Regulations",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      "Recording of Industrial Defects and Damages Official Register",
      "Regulation for Industrial Disease Disclosure and Occurrence Reporting"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations, which requires reporting of work-related accidents and incidents.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 57,
    question: "Under RIDDOR, what is the timeframe for reporting a death or specified injury?",
    options: [
      "Within 24 hours",
      "Without delay (immediately) by quickest practicable means",
      "Within 1 week",
      "Within 1 month"
    ],
    correctAnswer: 1,
    explanation: "Deaths and specified injuries must be reported without delay - by quickest practicable means, typically by phone, and followed up with a written report within 10 days.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 58,
    question: "Which of the following is a 'specified injury' under RIDDOR?",
    options: [
      "A minor cut requiring a plaster",
      "Fracture (other than fingers, thumbs, or toes)",
      "A headache",
      "Feeling unwell"
    ],
    correctAnswer: 1,
    explanation: "Specified injuries include fractures (except fingers/thumbs/toes), amputation, permanent loss of sight, crush injuries, burns, and scalping requiring hospital treatment.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 59,
    question: "What constitutes an 'over-7-day incapacitation' under RIDDOR?",
    options: [
      "Any absence from work",
      "Incapacity for normal work duties for more than 7 consecutive days (excluding day of accident)",
      "Any visit to a doctor",
      "Feeling unfit for 7 days"
    ],
    correctAnswer: 1,
    explanation: "Over-7-day incapacitation occurs when an employee is away from work or unable to perform their normal duties for more than 7 consecutive days, not counting the day of the accident.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 60,
    question: "Within what timeframe must an over-7-day incapacitation be reported to HSE?",
    options: [
      "Immediately",
      "Within 15 days of the accident",
      "Within 1 month",
      "No reporting required"
    ],
    correctAnswer: 1,
    explanation: "Over-7-day incapacitation injuries must be reported within 15 days of the accident.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 61,
    question: "Which is a reportable dangerous occurrence under RIDDOR?",
    options: [
      "A near miss while walking",
      "Collapse or overturning of lifting equipment, or electrical short circuit causing fire",
      "A verbal argument",
      "A minor spillage"
    ],
    correctAnswer: 1,
    explanation: "Dangerous occurrences include collapse of lifting equipment, electrical short circuits causing fire, failure of pressure vessels, and similar serious incidents with potential for major harm.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 62,
    question: "What is the main purpose of RIDDOR?",
    options: [
      "To punish employers",
      "To enable HSE and local authorities to identify workplace risks and investigate serious accidents",
      "To increase insurance premiums",
      "To provide compensation to injured workers"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR enables enforcing authorities to identify where and how risks arise, investigate serious accidents, and target their efforts to prevent future incidents.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 63,
    question: "Who is the 'responsible person' for RIDDOR reporting?",
    options: [
      "Any employee",
      "The employer, or the person in control of the premises where the incident occurred",
      "The injured person",
      "The HSE inspector"
    ],
    correctAnswer: 1,
    explanation: "The responsible person is usually the employer, but can be the person in control of the premises (e.g., landlord) or self-employed person in control of their work.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 64,
    question: "How should RIDDOR reports be submitted?",
    options: [
      "By post only",
      "Online via the HSE website, or by phone for fatal and specified injuries",
      "By email to any address",
      "In person only"
    ],
    correctAnswer: 1,
    explanation: "Reports should be made online at the HSE website. For fatal and specified injuries, telephone reporting is available for immediate notification.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 65,
    question: "Which occupational diseases are reportable under RIDDOR?",
    options: [
      "Common cold",
      "Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome",
      "Flu",
      "Hay fever"
    ],
    correctAnswer: 1,
    explanation: "Reportable occupational diseases include carpal tunnel syndrome, certain skin diseases, lung diseases, and hand-arm vibration syndrome when linked to specific work activities.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 66,
    question: "For how long must RIDDOR records be kept?",
    options: [
      "1 year",
      "At least 3 years from the date of the incident",
      "6 months",
      "Indefinitely"
    ],
    correctAnswer: 1,
    explanation: "Records of reportable injuries, diseases, and dangerous occurrences must be kept for at least 3 years from the date on which they were made.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 67,
    question: "What should be recorded in an accident book?",
    options: [
      "Only serious accidents",
      "All work-related accidents and injuries, however minor",
      "Only accidents requiring hospital treatment",
      "Only accidents involving equipment"
    ],
    correctAnswer: 1,
    explanation: "All work-related accidents and injuries should be recorded in the accident book, regardless of severity. This provides a record and can help identify patterns.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 68,
    question: "What is the penalty for failing to report under RIDDOR?",
    options: [
      "No penalty",
      "Unlimited fine and/or imprisonment for up to 2 years",
      "Warning letter only",
      "£100 fixed penalty"
    ],
    correctAnswer: 1,
    explanation: "Failing to report under RIDDOR is a criminal offence that can result in an unlimited fine and imprisonment for up to 2 years.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 69,
    question: "Do injuries to members of the public need to be reported under RIDDOR?",
    options: [
      "Never",
      "Yes, if they result from work activity and require hospital treatment",
      "Only if they complain",
      "Only in public buildings"
    ],
    correctAnswer: 1,
    explanation: "Injuries to non-workers (including members of the public) must be reported if they arise out of work activity and the person is taken directly to hospital for treatment.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 70,
    question: "What is a 'reportable gas incident' under RIDDOR?",
    options: [
      "Any gas smell",
      "Accidental leakage of gas causing death/injury or posing an immediate risk",
      "Using a gas appliance",
      "Installing gas equipment"
    ],
    correctAnswer: 1,
    explanation: "Gas incidents that result in death or injury, or where there was potential for such harm due to accidental leakage, are reportable under RIDDOR.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 71,
    question: "Which electrical incident is reportable as a dangerous occurrence?",
    options: [
      "Changing a light bulb",
      "Electrical short circuit or overload causing fire or explosion",
      "Tripping a circuit breaker",
      "Using an extension lead"
    ],
    correctAnswer: 1,
    explanation: "Electrical short circuits or overloads causing fire or explosion are reportable dangerous occurrences under RIDDOR.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 72,
    question: "What information must a RIDDOR report contain?",
    options: [
      "Just the person's name",
      "Details of injured person, accident circumstances, location, date/time, nature of injury",
      "Only the injury type",
      "Employee's bank details"
    ],
    correctAnswer: 1,
    explanation: "Reports must include: injured person's details, where and when it happened, a brief description of what happened, and the nature of the injury.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 73,
    question: "Under RIDDOR, amputation of which body parts is a specified injury?",
    options: [
      "Only legs",
      "Any amputation including fingers, toes, or limbs",
      "Only arms",
      "Amputation is not a specified injury"
    ],
    correctAnswer: 1,
    explanation: "Amputation of an arm, hand, finger, thumb, leg, foot, or toe is a specified injury that must be reported under RIDDOR.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 74,
    question: "What happens if an over-7-day injury was not known to be reportable at first?",
    options: [
      "No action needed",
      "Report as soon as you become aware the injury meets the criteria, within 15 days of becoming aware",
      "Only report after 1 year",
      "Report to police instead"
    ],
    correctAnswer: 1,
    explanation: "If an injury is not immediately identifiable as over-7-day, report within 15 days of becoming aware that the absence or incapacity has exceeded 7 days.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 75,
    question: "Are road traffic accidents reportable under RIDDOR?",
    options: [
      "Always",
      "Only if on a private road or part of construction work",
      "Never",
      "Only if involving company vehicles"
    ],
    correctAnswer: 1,
    explanation: "Road accidents are generally not reportable unless they occur on a private road forming part of the workplace, or as part of construction/maintenance work on public roads.",
    section: "1.3",
    difficulty: "advanced"
  },
  {
    id: 76,
    question: "What does 'incapacitated for normal work' mean under RIDDOR?",
    options: [
      "Off work completely",
      "Unable to perform their normal work duties, even if they can do other work",
      "Unable to walk",
      "Hospitalised"
    ],
    correctAnswer: 1,
    explanation: "Incapacitated for normal work means the person cannot perform the full range of their normal work duties, even if they attend work or can do restricted duties.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "Which burn injury is reportable as a specified injury?",
    options: [
      "Any minor burn",
      "A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs",
      "Sunburn",
      "Burns from hot drinks"
    ],
    correctAnswer: 1,
    explanation: "Burns or scalds covering more than 10% of the body surface, or causing significant damage to eyes, respiratory system, or vital organs, are specified injuries.",
    section: "1.3",
    difficulty: "intermediate"
  },
  {
    id: 78,
    question: "What is the 'arising out of or in connection with work' test for RIDDOR?",
    options: [
      "Any injury at work is reportable",
      "The injury must be caused by work activity, conditions created by work, or the manner of conducting the work",
      "Only injuries during paid hours",
      "Only injuries using work equipment"
    ],
    correctAnswer: 1,
    explanation: "An incident is reportable if it arises from work activity, from the way work is carried out, or from conditions created by the work or premises.",
    section: "1.3",
    difficulty: "advanced"
  },
  {
    id: 79,
    question: "What is the HSE's Incident Contact Centre?",
    options: [
      "A place to report insurance claims",
      "The HSE service for receiving RIDDOR reports and providing reporting guidance",
      "A hospital",
      "A training centre"
    ],
    correctAnswer: 1,
    explanation: "The HSE Incident Contact Centre receives RIDDOR reports and can provide advice on reporting requirements.",
    section: "1.3",
    difficulty: "basic"
  },
  {
    id: 80,
    question: "What action should be taken immediately after a serious workplace accident?",
    options: [
      "Continue working",
      "Make the area safe, provide first aid, preserve evidence, and report to RIDDOR",
      "Just call the insurance company",
      "Wait for management instruction"
    ],
    correctAnswer: 1,
    explanation: "After a serious accident: ensure safety of others, provide first aid, preserve the accident scene as evidence, notify the responsible person, and report under RIDDOR.",
    section: "1.3",
    difficulty: "basic"
  },

  // ============================================
  // Section 1.4: COSHH (Questions 81-105)
  // ============================================
  {
    id: 81,
    question: "What does COSHH stand for?",
    options: [
      "Control of Substances Hazardous to Health",
      "Certification of Safe Handling of Hazards",
      "Code of Safety for Hazardous Handling",
      "Control of Storage for Hazardous Health items"
    ],
    correctAnswer: 0,
    explanation: "COSHH stands for the Control of Substances Hazardous to Health Regulations 2002, which requires employers to control exposure to hazardous substances.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 82,
    question: "Which of the following is a substance hazardous to health under COSHH?",
    options: [
      "Clean water",
      "Solvents, chemicals, dusts, fumes, and biological agents",
      "Fresh air",
      "Food and drink"
    ],
    correctAnswer: 1,
    explanation: "COSHH covers substances hazardous to health including chemicals, products containing chemicals, fumes, dusts, vapours, mists, and biological agents.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 83,
    question: "What must employers do under COSHH before using hazardous substances?",
    options: [
      "Nothing specific",
      "Assess the risks and decide on necessary precautions",
      "Only label containers",
      "Only provide first aid"
    ],
    correctAnswer: 1,
    explanation: "Employers must assess the risks to health from hazardous substances and decide what precautions are needed before work with those substances begins.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 84,
    question: "What is a Safety Data Sheet (SDS)?",
    options: [
      "A building plan",
      "A document providing information about a hazardous substance including hazards, handling, and emergency measures",
      "An employee timesheet",
      "An insurance document"
    ],
    correctAnswer: 1,
    explanation: "An SDS provides comprehensive information about a substance including its hazards, safe handling procedures, storage requirements, and emergency measures.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 85,
    question: "What is a Workplace Exposure Limit (WEL)?",
    options: [
      "Working hours limit",
      "The maximum concentration of an airborne substance averaged over a reference period",
      "The maximum number of workers",
      "The maximum weight to lift"
    ],
    correctAnswer: 1,
    explanation: "A WEL is the maximum concentration of an airborne substance averaged over a reference period (typically 8 hours or 15 minutes) that workers should be exposed to.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 86,
    question: "Which hazard classification symbol indicates a substance is corrosive?",
    options: [
      "Skull and crossbones",
      "Hand being corroded and surface being attacked",
      "Flame",
      "Exclamation mark"
    ],
    correctAnswer: 1,
    explanation: "The corrosive symbol shows a hand and surface being attacked by a liquid, indicating the substance can cause severe burns to skin and eyes.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 87,
    question: "What does the GHS flame symbol indicate?",
    options: [
      "Hot surface",
      "Flammable substance",
      "High temperature required",
      "Fire exit nearby"
    ],
    correctAnswer: 1,
    explanation: "The flame symbol indicates the substance is flammable, meaning it can catch fire easily when exposed to ignition sources.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 88,
    question: "What control measures should be considered first under COSHH?",
    options: [
      "PPE",
      "Elimination or substitution with a less hazardous substance",
      "Warning signs",
      "Training only"
    ],
    correctAnswer: 1,
    explanation: "Under the hierarchy of control, elimination (not using the substance) or substitution (using a less hazardous alternative) should be considered first.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 89,
    question: "When must employers provide health surveillance under COSHH?",
    options: [
      "Never",
      "When exposure cannot be adequately controlled and specific health conditions can be identified",
      "Always for all employees",
      "Only if employees request it"
    ],
    correctAnswer: 1,
    explanation: "Health surveillance is required when exposure to a substance listed in Schedule 6 cannot be adequately controlled and there is a reasonable likelihood of disease or adverse effects.",
    section: "1.4",
    difficulty: "advanced"
  },
  {
    id: 90,
    question: "What is Local Exhaust Ventilation (LEV)?",
    options: [
      "Opening windows",
      "An engineering control that captures airborne contaminants at source before they spread",
      "Air conditioning",
      "Fans for cooling"
    ],
    correctAnswer: 1,
    explanation: "LEV is an engineering control system that captures airborne contaminants (dust, fumes, vapours) at or near the source before they can spread into the workplace.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 91,
    question: "How often must LEV systems be examined and tested?",
    options: [
      "Never",
      "At least every 14 months, or as specified in COSHH Schedule 4",
      "Every 5 years",
      "Only when broken"
    ],
    correctAnswer: 1,
    explanation: "LEV systems must be thoroughly examined and tested at least every 14 months, or more frequently as specified for specific processes in COSHH Schedule 4.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 92,
    question: "What PPE might be needed when working with solvents?",
    options: [
      "Steel toe cap boots only",
      "Chemical-resistant gloves, eye protection, and respiratory protection if ventilation is inadequate",
      "Hi-vis vest only",
      "Hard hat only"
    ],
    correctAnswer: 1,
    explanation: "Working with solvents may require chemical-resistant gloves, safety glasses or goggles, and respiratory protection if adequate ventilation cannot be achieved.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 93,
    question: "What is the purpose of a COSHH assessment?",
    options: [
      "To satisfy insurance requirements",
      "To identify hazards, who might be harmed, evaluate risks, and determine control measures",
      "To order chemicals",
      "To measure room temperature"
    ],
    correctAnswer: 1,
    explanation: "A COSHH assessment identifies what hazardous substances are used, who might be exposed, the routes of exposure, evaluates risks, and determines necessary control measures.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 94,
    question: "What routes can hazardous substances enter the body?",
    options: [
      "Only through the mouth",
      "Inhalation, skin absorption, ingestion, and injection",
      "Only through cuts",
      "Only through breathing"
    ],
    correctAnswer: 1,
    explanation: "Hazardous substances can enter the body through inhalation (breathing), skin absorption, ingestion (swallowing), and injection (through cuts or punctures).",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 95,
    question: "What must be recorded for a COSHH assessment?",
    options: [
      "Nothing needs recording",
      "Significant findings including hazards identified, who is at risk, control measures, and review date",
      "Only the chemical name",
      "Only the supplier details"
    ],
    correctAnswer: 1,
    explanation: "COSHH assessments must record significant findings including hazards identified, who might be affected, existing controls, additional measures needed, and review dates.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 96,
    question: "When should a COSHH assessment be reviewed?",
    options: [
      "Only when there's an accident",
      "Regularly and when there's reason to believe it's no longer valid, or when work conditions change",
      "Every 10 years",
      "Never - once done it's permanent"
    ],
    correctAnswer: 1,
    explanation: "COSHH assessments should be reviewed regularly and whenever there's reason to believe they're no longer valid, such as after incidents or changes to work processes.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 97,
    question: "What information does a hazard pictogram convey?",
    options: [
      "The price of the product",
      "The type of hazard posed by the substance",
      "The manufacturer's location",
      "The shelf life"
    ],
    correctAnswer: 1,
    explanation: "Hazard pictograms are symbols that quickly convey the type of hazard a substance poses, such as flammable, toxic, corrosive, or environmental hazard.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 98,
    question: "What does the skull and crossbones pictogram indicate?",
    options: [
      "Corrosive substance",
      "Acute toxicity - can cause death or serious harm with short exposure",
      "Flammable substance",
      "Environmental hazard"
    ],
    correctAnswer: 1,
    explanation: "The skull and crossbones indicates acute toxicity - the substance can cause death or serious harm even with short or one-time exposure.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 99,
    question: "What does the exclamation mark pictogram indicate?",
    options: [
      "Very high toxicity",
      "Lower level hazards including irritant, skin sensitiser, or harmful",
      "Explosive",
      "Radioactive"
    ],
    correctAnswer: 1,
    explanation: "The exclamation mark indicates lower-level hazards such as skin irritation, eye irritation, skin sensitisation, or substances harmful if swallowed.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 100,
    question: "What are Signal Words on chemical labels?",
    options: [
      "The manufacturer's name",
      "'Danger' or 'Warning' indicating the severity of hazard",
      "Batch numbers",
      "Expiry dates"
    ],
    correctAnswer: 1,
    explanation: "Signal words are 'Danger' (for more severe hazards) or 'Warning' (for less severe hazards) that indicate the relative severity of the hazard.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 101,
    question: "What are H-statements on chemical labels?",
    options: [
      "Health insurance information",
      "Hazard statements describing the nature of the hazard",
      "Handling fees",
      "Helpline numbers"
    ],
    correctAnswer: 1,
    explanation: "H-statements (Hazard statements) are standardised phrases describing the nature of the hazard, such as 'H225: Highly flammable liquid and vapour'.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 102,
    question: "What are P-statements on chemical labels?",
    options: [
      "Price information",
      "Precautionary statements advising on handling, storage, and emergency response",
      "Product codes",
      "Patent numbers"
    ],
    correctAnswer: 1,
    explanation: "P-statements (Precautionary statements) provide advice on safe handling, storage, disposal, and emergency measures, such as 'P210: Keep away from heat, sparks, open flame'.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 103,
    question: "How should chemicals be stored under COSHH?",
    options: [
      "Anywhere convenient",
      "In appropriate containers, in designated areas, with incompatible substances segregated",
      "In the same cupboard as food",
      "Without labels for tidiness"
    ],
    correctAnswer: 1,
    explanation: "Chemicals should be stored in original or appropriate containers, in designated well-ventilated areas, with incompatible substances segregated, and away from ignition sources.",
    section: "1.4",
    difficulty: "basic"
  },
  {
    id: 104,
    question: "What information must employers provide to employees about hazardous substances?",
    options: [
      "Nothing specific",
      "The risks, precautions, control measures, and results of any monitoring",
      "Only the brand names",
      "Only emergency contacts"
    ],
    correctAnswer: 1,
    explanation: "Employers must provide employees with information about the risks, necessary precautions, control measures in place, and results of any exposure monitoring.",
    section: "1.4",
    difficulty: "intermediate"
  },
  {
    id: 105,
    question: "What training must be provided under COSHH?",
    options: [
      "None required",
      "Training on hazards, safe use, control measures, emergency procedures, and PPE use",
      "Only how to read labels",
      "Only fire safety"
    ],
    correctAnswer: 1,
    explanation: "Employees must be trained on hazards of substances they work with, how to use control measures, proper use of PPE, emergency procedures, and storage requirements.",
    section: "1.4",
    difficulty: "basic"
  },

  // ============================================
  // Section 1.5: Risk Assessment (Questions 106-135)
  // ============================================
  {
    id: 106,
    question: "What is the legal requirement for risk assessment?",
    options: [
      "Only large companies need to do it",
      "All employers must make a suitable and sufficient assessment of risks to employees and others",
      "Only high-risk industries need to assess",
      "Risk assessment is optional"
    ],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 require all employers to make suitable and sufficient assessments of risks to employees and others.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 107,
    question: "What are the five steps of risk assessment?",
    options: [
      "Plan, Do, Check, Act, Review",
      "Identify hazards, Decide who might be harmed, Evaluate risks, Record findings, Review",
      "Start, Process, Finish, Record, File",
      "Assess, Plan, Action, Monitor, Close"
    ],
    correctAnswer: 1,
    explanation: "The five steps are: (1) Identify hazards, (2) Decide who might be harmed and how, (3) Evaluate risks and decide on precautions, (4) Record findings, (5) Review regularly.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 108,
    question: "What is the difference between a hazard and a risk?",
    options: [
      "They mean the same thing",
      "A hazard is something with potential to cause harm; risk is the likelihood of harm occurring",
      "A risk is physical; a hazard is theoretical",
      "Hazards only apply to chemicals"
    ],
    correctAnswer: 1,
    explanation: "A hazard is anything with potential to cause harm. Risk is the chance (high, medium, low) that somebody could be harmed by the hazard, along with the severity.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 109,
    question: "When must a risk assessment be recorded in writing?",
    options: [
      "Never",
      "When the employer has 5 or more employees",
      "Only for high-risk work",
      "Only if requested by HSE"
    ],
    correctAnswer: 1,
    explanation: "Employers with 5 or more employees must record the significant findings of their risk assessments in writing.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 110,
    question: "What does 'suitable and sufficient' mean for a risk assessment?",
    options: [
      "Done by a qualified assessor only",
      "Appropriate to the complexity of the task and identifies significant risks without being overly complicated",
      "At least 10 pages long",
      "Approved by HSE"
    ],
    correctAnswer: 1,
    explanation: "A suitable and sufficient assessment identifies significant risks, is appropriate to the nature and scale of the work, and remains valid for a reasonable time.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 111,
    question: "Who should be involved in carrying out a risk assessment?",
    options: [
      "Only the health and safety officer",
      "Competent person(s) with knowledge of the work, often involving workers who do the task",
      "Only external consultants",
      "Only managers"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should be carried out by competent people with knowledge of the work. Involving workers who do the task provides valuable practical insight.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 112,
    question: "What factors should be considered when evaluating risk?",
    options: [
      "Only the cost of controls",
      "Likelihood of harm occurring and the severity of consequences",
      "Only previous accidents",
      "Only weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Risk evaluation considers both the likelihood of harm occurring and the potential severity of that harm. Controls should reduce risk to as low as reasonably practicable.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 113,
    question: "What is a 'dynamic risk assessment'?",
    options: [
      "A risk assessment done while exercising",
      "Continuous assessment of changing risks while work is in progress",
      "A digital risk assessment",
      "A risk assessment for vehicles"
    ],
    correctAnswer: 1,
    explanation: "A dynamic risk assessment is the continuous process of identifying hazards and assessing risks as work progresses, particularly when conditions change unexpectedly.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 114,
    question: "What is a 'generic' risk assessment?",
    options: [
      "A risk assessment done generically without thought",
      "A risk assessment that covers common activities across multiple similar situations",
      "A risk assessment for general cleaning",
      "A risk assessment template with no details"
    ],
    correctAnswer: 1,
    explanation: "A generic risk assessment covers common activities that remain consistent across different sites or situations, requiring site-specific additions when used.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 115,
    question: "What hazards should be considered in electrical work risk assessments?",
    options: [
      "Only electric shock",
      "Electric shock, burns, fire, explosion, falls from height, manual handling",
      "Only equipment failure",
      "Only weather"
    ],
    correctAnswer: 1,
    explanation: "Electrical work risk assessments should consider electric shock, burns, fire, explosion, falls from height, manual handling, confined spaces, and other relevant hazards.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 116,
    question: "How should vulnerable workers be considered in risk assessments?",
    options: [
      "They should be excluded from work",
      "Additional controls may be needed for young workers, pregnant women, or those with disabilities",
      "Same controls apply to everyone",
      "They don't need consideration"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments must consider vulnerable workers such as young people, new or expectant mothers, and those with disabilities who may need additional protective measures.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 117,
    question: "What is a risk matrix used for?",
    options: [
      "Calculating project costs",
      "Evaluating and prioritising risks by plotting likelihood against severity",
      "Scheduling work",
      "Tracking employee attendance"
    ],
    correctAnswer: 1,
    explanation: "A risk matrix helps evaluate and prioritise risks by plotting the likelihood of occurrence against the severity of consequences to give a risk rating.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 118,
    question: "What does ALARP stand for?",
    options: [
      "Always Look At Risk Properly",
      "As Low As Reasonably Practicable",
      "All Locations Are Risk Prone",
      "Assessment Leads to Appropriate Risk Prevention"
    ],
    correctAnswer: 1,
    explanation: "ALARP stands for 'As Low As Reasonably Practicable' - the principle that risks should be reduced to the lowest level that is reasonably practicable.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 119,
    question: "When should a risk assessment be reviewed?",
    options: [
      "Only annually",
      "When there are significant changes, after incidents, or if it's no longer valid",
      "Every 5 years",
      "Only when HSE visits"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should be reviewed when there are significant changes to work, after accidents or near misses, or when there's reason to believe they're no longer valid.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 120,
    question: "What is residual risk?",
    options: [
      "Risk that no longer exists",
      "The remaining risk after control measures have been implemented",
      "Risk from residues",
      "Historical risk data"
    ],
    correctAnswer: 1,
    explanation: "Residual risk is the level of risk that remains after control measures have been implemented. It should be as low as reasonably practicable.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 121,
    question: "What is the purpose of the control measures section in a risk assessment?",
    options: [
      "To list equipment used",
      "To specify actions taken or needed to eliminate or reduce risks",
      "To record costs",
      "To list employees involved"
    ],
    correctAnswer: 1,
    explanation: "The control measures section specifies the actions taken or needed to eliminate hazards or reduce risks to an acceptable level.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 122,
    question: "Why is it important to identify who might be harmed in a risk assessment?",
    options: [
      "For insurance purposes only",
      "To ensure control measures protect everyone affected including employees, contractors, and public",
      "Just for record keeping",
      "Only to identify who to blame"
    ],
    correctAnswer: 1,
    explanation: "Identifying who might be harmed ensures control measures adequately protect everyone who could be affected, including employees, contractors, visitors, and the public.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 123,
    question: "What is a 'point of work' risk assessment?",
    options: [
      "A risk assessment done in the office",
      "A brief risk assessment carried out immediately before starting a task at the work location",
      "A risk assessment for pointing equipment",
      "A written policy document"
    ],
    correctAnswer: 1,
    explanation: "A point of work risk assessment is a brief check done at the actual location immediately before starting work to identify any site-specific hazards.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 124,
    question: "What information sources can help identify hazards?",
    options: [
      "Only personal experience",
      "Manufacturer instructions, safety data sheets, accident records, industry guidance, and worker input",
      "Only HSE publications",
      "Only insurance documents"
    ],
    correctAnswer: 1,
    explanation: "Hazard identification can use manufacturer instructions, SDSs, accident records, near-miss reports, industry guidance, HSE publications, and input from workers.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 125,
    question: "What is a 'reasonably foreseeable' hazard?",
    options: [
      "A hazard that definitely will occur",
      "A hazard that a competent person could reasonably predict might occur",
      "A hazard mentioned in newspapers",
      "A hazard that has already happened"
    ],
    correctAnswer: 1,
    explanation: "A reasonably foreseeable hazard is one that a competent person could predict might occur given the nature of the work and circumstances.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 126,
    question: "How should control measures be prioritised?",
    options: [
      "By cost only",
      "Using the hierarchy of control: eliminate, substitute, engineer, administrate, PPE",
      "Alphabetically",
      "By convenience"
    ],
    correctAnswer: 1,
    explanation: "Control measures should follow the hierarchy: eliminate the hazard, substitute with less hazardous, engineering controls, administrative controls, then PPE as last resort.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 127,
    question: "What should a risk assessment action plan include?",
    options: [
      "Only a list of hazards",
      "Actions needed, responsible person, target date, and completion date",
      "Only costs",
      "Only equipment lists"
    ],
    correctAnswer: 1,
    explanation: "An action plan should specify what actions are needed, who is responsible for implementing them, target completion dates, and actual completion dates.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 128,
    question: "What is the significance of reviewing accident and near-miss data in risk assessment?",
    options: [
      "Only for legal records",
      "To identify recurring patterns and previously unidentified hazards",
      "To calculate insurance premiums",
      "To identify employees to discipline"
    ],
    correctAnswer: 1,
    explanation: "Reviewing accident and near-miss data helps identify recurring hazards, patterns of incidents, and potential risks that may not have been previously recognised.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 129,
    question: "What role does consultation play in risk assessment?",
    options: [
      "It's not required",
      "Workers must be consulted on health and safety matters including risk assessment",
      "Only management decides",
      "Only unions are consulted"
    ],
    correctAnswer: 1,
    explanation: "Employers must consult workers or their representatives on health and safety matters. Workers often have valuable insight into hazards and practical control measures.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 130,
    question: "What is task-specific risk assessment?",
    options: [
      "A risk assessment for any task",
      "A detailed assessment focused on a particular activity or operation",
      "A general workplace assessment",
      "A risk assessment for equipment only"
    ],
    correctAnswer: 1,
    explanation: "A task-specific risk assessment focuses on the particular hazards and risks associated with a specific activity or operation being carried out.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 131,
    question: "What environmental factors should be considered in risk assessments?",
    options: [
      "Only climate change",
      "Weather, lighting, temperature, noise, ventilation, and access conditions",
      "Only noise levels",
      "Only air quality"
    ],
    correctAnswer: 1,
    explanation: "Environmental factors include weather conditions, lighting levels, temperature extremes, noise, ventilation, working at height access, confined spaces, and similar conditions.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 132,
    question: "What is a 'safe system of work'?",
    options: [
      "Any working method",
      "A formal procedure resulting from systematic examination of work to identify hazards and methods to eliminate or minimise them",
      "Working in pairs",
      "Following verbal instructions"
    ],
    correctAnswer: 1,
    explanation: "A safe system of work is a formal procedure based on systematic examination to identify hazards and define methods to eliminate or minimise risks.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 133,
    question: "How should lone working be addressed in risk assessments?",
    options: [
      "Lone working doesn't need assessment",
      "Specific consideration of communication, emergency procedures, and additional controls needed",
      "Simply ban lone working",
      "Only consider during night shifts"
    ],
    correctAnswer: 1,
    explanation: "Lone working requires specific assessment of communication means, emergency procedures, supervision arrangements, and any additional controls needed for isolated work.",
    section: "1.5",
    difficulty: "intermediate"
  },
  {
    id: 134,
    question: "What training is required regarding risk assessments?",
    options: [
      "No training required",
      "Workers must understand the risks, control measures, and their responsibilities",
      "Only supervisors need training",
      "Only written information is required"
    ],
    correctAnswer: 1,
    explanation: "Workers must be trained to understand the risks they face, the control measures in place, how to use them correctly, and their responsibilities.",
    section: "1.5",
    difficulty: "basic"
  },
  {
    id: 135,
    question: "What should happen if new hazards are identified during work?",
    options: [
      "Continue working and report later",
      "Stop, reassess the risks, implement additional controls if needed, and update the risk assessment",
      "Ignore if work is nearly finished",
      "Only report to HSE"
    ],
    correctAnswer: 1,
    explanation: "If new hazards are identified, work should stop for reassessment. Additional controls should be implemented if needed and the risk assessment updated.",
    section: "1.5",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 1.6: Method Statements (Questions 136-160)
  // ============================================
  {
    id: 136,
    question: "What is a method statement?",
    options: [
      "A list of tools needed",
      "A written document describing how work will be carried out safely, step by step",
      "A general safety policy",
      "A list of employees"
    ],
    correctAnswer: 1,
    explanation: "A method statement (also called safe system of work document) describes in detail how work will be done safely, including the sequence of operations and controls.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 137,
    question: "What is the relationship between risk assessment and method statement?",
    options: [
      "They are the same document",
      "The method statement describes how to implement the controls identified in the risk assessment",
      "They are unrelated",
      "Method statements replace risk assessments"
    ],
    correctAnswer: 1,
    explanation: "A method statement describes how to implement the control measures identified in the risk assessment, providing step-by-step safe working procedures.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 138,
    question: "What information should a method statement contain?",
    options: [
      "Only the company name",
      "Description of work, sequence of operations, equipment, control measures, responsible persons",
      "Only a start date",
      "Only emergency contacts"
    ],
    correctAnswer: 1,
    explanation: "Method statements should include work description, sequence of operations, equipment and materials, control measures, responsibilities, and emergency procedures.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 139,
    question: "When is a method statement typically required?",
    options: [
      "Only for new employees",
      "For complex, high-risk activities or when required by clients/principal contractors",
      "Only on Mondays",
      "Only for office work"
    ],
    correctAnswer: 1,
    explanation: "Method statements are typically required for complex or high-risk activities, permit-controlled work, or when specified by clients or principal contractors.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 140,
    question: "What does RAMS stand for in construction?",
    options: [
      "Risk Assessment Methods Standard",
      "Risk Assessment and Method Statement",
      "Regulations for All Manufacturing Sites",
      "Records of All Material Supplies"
    ],
    correctAnswer: 1,
    explanation: "RAMS stands for Risk Assessment and Method Statement - the combined documentation of hazards, risks, and safe working procedures for a task.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 141,
    question: "Who should prepare method statements?",
    options: [
      "Only health and safety consultants",
      "A competent person with knowledge of the work, often involving those who will do the task",
      "Only the client",
      "Only HSE"
    ],
    correctAnswer: 1,
    explanation: "Method statements should be prepared by competent persons with relevant knowledge and experience, ideally involving the workers who will carry out the task.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 142,
    question: "How should method statements be communicated to workers?",
    options: [
      "Posted on a notice board only",
      "Through briefings, toolbox talks, and making them available at the work location",
      "By email only",
      "Workers don't need to see them"
    ],
    correctAnswer: 1,
    explanation: "Method statements should be communicated through briefings or toolbox talks before work starts and be available at the work location for reference.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 143,
    question: "What is a toolbox talk?",
    options: [
      "A talk about tools to buy",
      "A short, focused safety briefing on a specific topic relevant to the work",
      "A meeting about toolboxes",
      "A formal training course"
    ],
    correctAnswer: 1,
    explanation: "A toolbox talk is a short, focused briefing (typically 5-15 minutes) on a specific health and safety topic relevant to the work being undertaken.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 144,
    question: "What is a permit to work system?",
    options: [
      "A work visa",
      "A formal system ensuring high-risk work is properly planned, authorised, and controlled",
      "A parking permit",
      "Permission to start employment"
    ],
    correctAnswer: 1,
    explanation: "A permit to work is a formal documented system that ensures high-risk work is properly planned, all hazards identified, and appropriate controls in place before work starts.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 145,
    question: "For which activities might a permit to work be required?",
    options: [
      "All work activities",
      "Hot work, confined space entry, electrical isolation, working at height on roofs",
      "Office work only",
      "Lunch breaks"
    ],
    correctAnswer: 1,
    explanation: "Permits to work are typically required for hot work, confined space entry, electrical isolation work, excavations, and work on fragile roofs or at significant height.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 146,
    question: "What are the key elements of a permit to work?",
    options: [
      "Just a signature",
      "Description of work, hazards, precautions, isolation details, time limits, authorisation signatures",
      "Employee names only",
      "Equipment list only"
    ],
    correctAnswer: 1,
    explanation: "Key elements include work description, identified hazards, required precautions, isolation/lockout details, time validity, authorisation signatures, and completion sign-off.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 147,
    question: "What is the purpose of a 'work sequence' in a method statement?",
    options: [
      "To list workers alphabetically",
      "To describe the order of operations ensuring safety at each stage",
      "To schedule breaks",
      "To plan overtime"
    ],
    correctAnswer: 1,
    explanation: "The work sequence describes the step-by-step order of operations, ensuring hazards are controlled at each stage and work proceeds safely and logically.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 148,
    question: "What PPE requirements should be included in a method statement?",
    options: [
      "None - PPE is separate",
      "Specific PPE required for each stage of the work",
      "Only hard hats",
      "Only high-vis vests"
    ],
    correctAnswer: 1,
    explanation: "Method statements should specify the PPE required for each stage of the work, ensuring workers are properly protected throughout the task.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 149,
    question: "How should emergency procedures be addressed in method statements?",
    options: [
      "Not necessary",
      "Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements",
      "Just dial 999",
      "Refer to general company policy only"
    ],
    correctAnswer: 1,
    explanation: "Method statements should include specific emergency procedures for the task, including emergency actions, evacuation routes, emergency contacts, and first aid arrangements.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 150,
    question: "What supervision requirements should method statements address?",
    options: [
      "Supervision is not relevant",
      "Level and type of supervision needed, who the supervisor is, and their responsibilities",
      "Only for apprentices",
      "Only the site manager's name"
    ],
    correctAnswer: 1,
    explanation: "Method statements should specify the level of supervision required, identify the supervisor, and define their responsibilities for overseeing safe work.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 151,
    question: "What is a 'point of work briefing'?",
    options: [
      "A written report",
      "A brief verbal review of the method statement at the work location before starting",
      "A job interview",
      "A performance review"
    ],
    correctAnswer: 1,
    explanation: "A point of work briefing is a short verbal review of the method statement and risk assessment at the work location immediately before starting the task.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 152,
    question: "How should changes to planned work be handled?",
    options: [
      "Continue regardless",
      "Stop, reassess, amend the method statement if needed, and brief workers on changes",
      "Only report after completion",
      "Ignore minor changes"
    ],
    correctAnswer: 1,
    explanation: "Changes should trigger a stop to reassess risks. The method statement should be amended if needed and workers briefed on any changes before proceeding.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 153,
    question: "What is the role of the 'competent person' in method statements?",
    options: [
      "Just signing documents",
      "Ensuring work is planned, supervised, and carried out safely by people with appropriate skills",
      "Only doing the work themselves",
      "Only ordering equipment"
    ],
    correctAnswer: 1,
    explanation: "The competent person ensures work is properly planned, appropriately supervised, and carried out by people with the necessary skills, knowledge, and experience.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 154,
    question: "What information about equipment should be in a method statement?",
    options: [
      "Only brand names",
      "Equipment needed, inspection requirements, safe use procedures, and any specific limitations",
      "Only purchase prices",
      "Only colours"
    ],
    correctAnswer: 1,
    explanation: "Method statements should specify equipment needed, pre-use inspection requirements, safe operating procedures, weight/load limits, and maintenance requirements.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 155,
    question: "How should interface risks with other trades be addressed?",
    options: [
      "Not considered",
      "Identify where work interfaces with others and specify coordination measures",
      "Work independently always",
      "Only communicate after work"
    ],
    correctAnswer: 1,
    explanation: "Method statements should identify where work interfaces with other trades or activities and specify coordination measures to prevent conflicts and maintain safety.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 156,
    question: "What records should be kept related to method statements?",
    options: [
      "No records needed",
      "The method statement, briefing records, permits, completion records, and any amendments",
      "Only the original document",
      "Only signatures"
    ],
    correctAnswer: 1,
    explanation: "Records should include the method statement, evidence of worker briefings, associated permits, completion/handback records, and documentation of any amendments.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 157,
    question: "What is a 'task brief' in relation to method statements?",
    options: [
      "A short description of the company",
      "A summary of key points from the method statement communicated to workers before starting",
      "A task for new employees",
      "A written complaint"
    ],
    correctAnswer: 1,
    explanation: "A task brief is a summary of key safety points from the method statement communicated to workers to ensure they understand the safe system of work.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 158,
    question: "How should housekeeping be addressed in method statements?",
    options: [
      "Not relevant to safety",
      "Specify requirements for maintaining a clean, tidy workspace and waste disposal",
      "Only at the end of the job",
      "Only for cleaning staff"
    ],
    correctAnswer: 1,
    explanation: "Good housekeeping prevents accidents. Method statements should specify requirements for maintaining a tidy workspace, material storage, and waste disposal.",
    section: "1.6",
    difficulty: "basic"
  },
  {
    id: 159,
    question: "What is the purpose of sign-off at completion in a permit system?",
    options: [
      "Just for records",
      "To confirm work is complete, the area is safe, and controls can be removed",
      "To get paid",
      "To leave the site"
    ],
    correctAnswer: 1,
    explanation: "Sign-off confirms work is complete, the area is left in a safe condition, and any isolation or barriers can be removed, allowing normal operations to resume.",
    section: "1.6",
    difficulty: "intermediate"
  },
  {
    id: 160,
    question: "What environmental controls might be specified in a method statement?",
    options: [
      "None needed",
      "Dust suppression, noise control, waste management, and prevention of pollution",
      "Only recycling",
      "Only litter picking"
    ],
    correctAnswer: 1,
    explanation: "Environmental controls might include dust suppression methods, noise barriers, waste segregation and disposal, and measures to prevent water or soil pollution.",
    section: "1.6",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 1.7: PPE & Safe Systems (Questions 161-185)
  // ============================================
  {
    id: 161,
    question: "What does PPE stand for?",
    options: [
      "Personal Protective Equipment",
      "Professional Performance Evaluation",
      "Primary Protection Enforcement",
      "Protective Policy Enforcement"
    ],
    correctAnswer: 0,
    explanation: "PPE stands for Personal Protective Equipment - equipment worn or held to protect against risks to health and safety.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 162,
    question: "According to PPE regulations, when should PPE be used?",
    options: [
      "Always, regardless of other controls",
      "Only as a last resort when risks cannot be adequately controlled by other means",
      "Only when requested by employees",
      "Only in emergencies"
    ],
    correctAnswer: 1,
    explanation: "PPE should only be used as a last resort when risks cannot be adequately controlled by other means such as elimination, substitution, or engineering controls.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 163,
    question: "What are employers' duties regarding PPE?",
    options: [
      "Only to provide it",
      "Provide suitable PPE free of charge, ensure it's maintained, provide storage, training, and enforce use",
      "Recommend where to buy it",
      "Let employees choose their own"
    ],
    correctAnswer: 1,
    explanation: "Employers must provide suitable PPE free of charge, maintain it properly, provide storage, train workers in its use, and ensure it is worn.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 164,
    question: "What does the CE/UKCA mark on PPE indicate?",
    options: [
      "Cheapest Equipment",
      "Conformity with relevant health and safety standards",
      "Chinese Export",
      "Company Equipment"
    ],
    correctAnswer: 1,
    explanation: "CE (or UKCA for UK) marking indicates the PPE meets essential health and safety requirements of relevant regulations and standards.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 165,
    question: "What PPE is typically required for electrical work?",
    options: [
      "No PPE needed",
      "Safety footwear, insulating gloves (if appropriate), eye protection, suitable clothing",
      "Only a hard hat",
      "Only gloves"
    ],
    correctAnswer: 1,
    explanation: "Electrical work typically requires safety footwear, insulating gloves for live working, eye protection, non-flammable clothing, and sometimes arc flash protection.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 166,
    question: "What is the employee's duty regarding PPE?",
    options: [
      "None - it's the employer's responsibility",
      "Use it properly, report defects, store it correctly, and not misuse it",
      "Clean it only",
      "Pay for replacements"
    ],
    correctAnswer: 1,
    explanation: "Employees must use PPE properly in accordance with training, report defects or loss, store it correctly, and not intentionally misuse it.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 167,
    question: "What factors should be considered when selecting PPE?",
    options: [
      "Only price",
      "The hazard, level of protection needed, fit, compatibility with other PPE, comfort",
      "Only colour",
      "Only brand"
    ],
    correctAnswer: 1,
    explanation: "PPE selection should consider the hazard type and level, required protection level, proper fit for the wearer, compatibility with other PPE, and wearer comfort.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 168,
    question: "What class of insulating gloves is typically used for low voltage work?",
    options: [
      "Class 00 or Class 0",
      "Class 3 or Class 4",
      "Any leather gloves",
      "No gloves needed"
    ],
    correctAnswer: 0,
    explanation: "Class 00 (up to 500V) or Class 0 (up to 1000V) insulating gloves are typically used for low voltage electrical work, tested to relevant standards.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 169,
    question: "How often should insulating gloves be tested?",
    options: [
      "Never",
      "At regular intervals as specified by the manufacturer, typically every 6 months",
      "Every 5 years",
      "Only after visible damage"
    ],
    correctAnswer: 1,
    explanation: "Insulating gloves must be tested regularly as specified by the manufacturer (typically every 6 months) and inspected before each use.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 170,
    question: "What is arc flash protection?",
    options: [
      "Camera flash protection",
      "Specialised PPE protecting against thermal hazards from electrical arc flash incidents",
      "Lightning protection",
      "Flash photography clothing"
    ],
    correctAnswer: 1,
    explanation: "Arc flash protection is specialised PPE (clothing, face shields, gloves) designed to protect against the intense heat and light from electrical arc flash incidents.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 171,
    question: "What does an arc flash risk assessment determine?",
    options: [
      "Camera settings",
      "The incident energy level and appropriate PPE category required",
      "Lighting requirements",
      "Flash duration"
    ],
    correctAnswer: 1,
    explanation: "Arc flash risk assessment calculates the potential incident energy (cal/cm²) to determine the appropriate arc-rated PPE category for worker protection.",
    section: "1.7",
    difficulty: "advanced"
  },
  {
    id: 172,
    question: "What type of eye protection is suitable for electrical work?",
    options: [
      "Sunglasses",
      "Safety glasses or goggles rated for impact and potentially arc flash",
      "Reading glasses",
      "No eye protection needed"
    ],
    correctAnswer: 1,
    explanation: "Safety glasses or goggles rated for impact protection are required, with arc-rated protection for work where arc flash is a risk.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 173,
    question: "Why is synthetic clothing not recommended for electrical work?",
    options: [
      "It's too expensive",
      "It can melt and adhere to skin in an arc flash, worsening burns",
      "It's not fashionable",
      "It's too heavy"
    ],
    correctAnswer: 1,
    explanation: "Synthetic materials can melt in an arc flash and adhere to skin, significantly worsening burn injuries. Natural fibres or arc-rated materials are preferred.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 174,
    question: "What is the purpose of safety footwear in electrical work?",
    options: [
      "Fashion only",
      "Protection against falling objects, punctures, and electrical hazards",
      "To run faster",
      "Warmth only"
    ],
    correctAnswer: 1,
    explanation: "Safety footwear provides protection against falling objects, puncture hazards, and may include electrical hazard (EH) rating for protection against electrical contact.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 175,
    question: "What is a safe isolation procedure?",
    options: [
      "A social distancing measure",
      "A step-by-step procedure to ensure electrical equipment is safely disconnected from supply before work",
      "An isolation hospital procedure",
      "Working alone"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation is a systematic procedure to safely disconnect electrical equipment from all sources of supply and verify it is dead before work begins.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 176,
    question: "What are the key steps in safe isolation?",
    options: [
      "Switch off and start work",
      "Identify circuit, isolate, secure isolation, prove dead, apply lock-off, work safely",
      "Ask someone else to do it",
      "Just use a voltage indicator"
    ],
    correctAnswer: 1,
    explanation: "Steps: identify the circuit, switch off and isolate, secure the isolation (lock-off), prove dead with a tested voltage indicator, then apply lock-off/warning notices.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 177,
    question: "Why must a voltage indicator be tested before and after use?",
    options: [
      "To waste time",
      "To ensure it is working correctly and give confidence the circuit is dead",
      "Company policy only",
      "To charge the battery"
    ],
    correctAnswer: 1,
    explanation: "Testing the voltage indicator on a known live source before and after use confirms it is working correctly, giving confidence that a 'dead' reading is accurate.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 178,
    question: "What is a proving unit used for?",
    options: [
      "Mathematical proofs",
      "A known voltage source to test voltage indicators work correctly before and after use",
      "Proving employment",
      "Testing cable strength"
    ],
    correctAnswer: 1,
    explanation: "A proving unit provides a known voltage to verify a voltage indicator is working correctly before testing a circuit and confirming it after proving dead.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 179,
    question: "What is the purpose of lock-off devices?",
    options: [
      "To lock office doors",
      "To physically prevent an isolator being switched back on while work is in progress",
      "To lock toolboxes",
      "To secure vehicles"
    ],
    correctAnswer: 1,
    explanation: "Lock-off devices physically prevent an isolator or circuit breaker being switched back on while work is in progress, maintaining safe isolation.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 180,
    question: "When multiple people are working on an isolated circuit, what lock-off approach should be used?",
    options: [
      "One person's lock is enough",
      "Each person applies their own lock (multi-lock hasp) and keeps their own key",
      "No locks needed with multiple people",
      "Supervisor holds all keys"
    ],
    correctAnswer: 1,
    explanation: "When multiple people work on an isolated circuit, each person should apply their own padlock using a multi-lock hasp, keeping their own key until their work is complete.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 181,
    question: "What warning notices should be displayed during isolation?",
    options: [
      "None required",
      "Clear warning signs indicating work in progress and prohibition against re-energising",
      "Only the company logo",
      "Only the worker's name"
    ],
    correctAnswer: 1,
    explanation: "Clear warning signs should be displayed at the isolation point indicating work is in progress and that the circuit must not be re-energised.",
    section: "1.7",
    difficulty: "basic"
  },
  {
    id: 182,
    question: "What is a permit to work for electrical isolation?",
    options: [
      "A parking permit",
      "A formal documented authorisation for work on or near isolated electrical equipment",
      "A work visa",
      "A driving licence"
    ],
    correctAnswer: 1,
    explanation: "An electrical permit to work is a formal document authorising specific work, detailing isolation points, precautions, and requiring sign-off before and after work.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 183,
    question: "What should be done if a circuit cannot be isolated?",
    options: [
      "Work live anyway",
      "Follow strict live working procedures if justified, or postpone work until isolation is possible",
      "Ask someone else to do it",
      "Ignore the hazard"
    ],
    correctAnswer: 1,
    explanation: "If isolation isn't possible and live working is justified under EAWR Regulation 14, strict live working procedures with appropriate controls must be followed.",
    section: "1.7",
    difficulty: "advanced"
  },
  {
    id: 184,
    question: "What is the three-point test procedure for voltage indicators?",
    options: [
      "Test three times",
      "Test on known live source, test the circuit, retest on known live source",
      "Test three circuits",
      "Use three indicators"
    ],
    correctAnswer: 1,
    explanation: "The three-point test: verify the indicator works on a known live source, test the isolated circuit, then verify the indicator still works on the known live source.",
    section: "1.7",
    difficulty: "intermediate"
  },
  {
    id: 185,
    question: "What additional precautions are needed for HV (high voltage) safe isolation?",
    options: [
      "No additional precautions",
      "Trained authorised persons, HV switching procedures, earthing equipment, additional testing",
      "Just bigger locks",
      "Only during daylight hours"
    ],
    correctAnswer: 1,
    explanation: "HV work requires specially trained authorised persons, formal switching programmes, application of circuit main earths, and HV-rated testing equipment.",
    section: "1.7",
    difficulty: "advanced"
  },

  // ============================================
  // Section 1.8: Emergency Procedures (Questions 186-200)
  // ============================================
  {
    id: 186,
    question: "What is the first action on discovering an electrical fire?",
    options: [
      "Use water to extinguish",
      "Raise the alarm and isolate the power supply if safe to do so",
      "Continue working",
      "Open windows"
    ],
    correctAnswer: 1,
    explanation: "On discovering an electrical fire: raise the alarm immediately, isolate the power supply if it is safe to do so, then evacuate and call the fire service.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 187,
    question: "Which type of fire extinguisher is safe to use on electrical fires?",
    options: [
      "Water",
      "CO2 (carbon dioxide) or dry powder",
      "Foam",
      "Water with additive"
    ],
    correctAnswer: 1,
    explanation: "CO2 and dry powder extinguishers are safe for electrical fires. Water and foam must not be used as they conduct electricity. CO2 is preferred as it leaves no residue.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 188,
    question: "What is the immediate first aid response to electric shock?",
    options: [
      "Pour water on the casualty",
      "Ensure the power is off, check for response, call for help, and perform CPR if needed",
      "Move the casualty immediately",
      "Give food and drink"
    ],
    correctAnswer: 1,
    explanation: "Ensure the power source is isolated, check if the casualty is responsive, call for help (999), and begin CPR if they are not breathing normally.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 189,
    question: "Why should you never touch someone receiving an electric shock?",
    options: [
      "It's rude",
      "You could become part of the circuit and also receive a shock",
      "They might be angry",
      "There's no reason"
    ],
    correctAnswer: 1,
    explanation: "Touching someone receiving a shock can make you part of the electrical circuit, giving you a shock too. Isolate the power first or use a dry non-conductive material.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 190,
    question: "What burns may result from electric shock?",
    options: [
      "No burns occur from electricity",
      "Entry and exit burns, as well as internal tissue damage along the current path",
      "Only surface burns",
      "Burns only from flames"
    ],
    correctAnswer: 1,
    explanation: "Electric shock can cause burns at entry and exit points, plus internal tissue damage along the path the current takes through the body.",
    section: "1.8",
    difficulty: "intermediate"
  },
  {
    id: 191,
    question: "What is the emergency procedure for an arc flash injury?",
    options: [
      "No special procedure needed",
      "Extinguish any burning clothing, cool burns with water, cover loosely, treat for shock, get emergency help",
      "Apply tight bandages",
      "Rub the burns"
    ],
    correctAnswer: 1,
    explanation: "For arc flash: extinguish burning clothing, cool burns with clean water, cover loosely with non-adhesive dressing, treat for shock, and seek emergency medical help.",
    section: "1.8",
    difficulty: "intermediate"
  },
  {
    id: 192,
    question: "What should an emergency evacuation plan include?",
    options: [
      "Only the fire exit locations",
      "Escape routes, assembly points, roll call procedures, emergency contacts, and procedures for assisting those needing help",
      "Only the site address",
      "Just the fire warden's name"
    ],
    correctAnswer: 1,
    explanation: "Emergency plans should include escape routes, assembly points, roll call procedures, emergency service contacts, and arrangements for those needing assistance to evacuate.",
    section: "1.8",
    difficulty: "intermediate"
  },
  {
    id: 193,
    question: "How often should emergency procedures be practised?",
    options: [
      "Never",
      "Regularly, with fire drills at least annually and more frequent briefings",
      "Only after an incident",
      "Every 10 years"
    ],
    correctAnswer: 1,
    explanation: "Emergency procedures should be practised regularly. Fire drills should occur at least annually, with more frequent briefings for new starters and when procedures change.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 194,
    question: "What information must be displayed at the workplace regarding emergencies?",
    options: [
      "Nothing specific",
      "Fire action notices, evacuation routes, assembly points, emergency contacts",
      "Only the owner's name",
      "Only opening hours"
    ],
    correctAnswer: 1,
    explanation: "Workplaces must display fire action notices, indicate evacuation routes and fire exits, show assembly points, and provide emergency contact information.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 195,
    question: "What is the role of a fire warden?",
    options: [
      "To start fires",
      "To assist with evacuation, check designated areas are clear, and report to the assembly point",
      "To fight all fires",
      "To call in sick"
    ],
    correctAnswer: 1,
    explanation: "Fire wardens assist with evacuation, check their designated areas are clear, direct people to exits, help those needing assistance, and report status at the assembly point.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 196,
    question: "When should you attempt to fight a fire?",
    options: [
      "Always",
      "Only if trained, it's safe to do so, you have the right extinguisher, and the fire is small",
      "Never",
      "Only with water"
    ],
    correctAnswer: 1,
    explanation: "Only attempt to fight a fire if trained, you have a safe escape route, the right type of extinguisher, and the fire is small enough to tackle safely.",
    section: "1.8",
    difficulty: "intermediate"
  },
  {
    id: 197,
    question: "What is the primary purpose of the assembly point?",
    options: [
      "To have a meeting",
      "A safe location where evacuated personnel gather to be accounted for",
      "To store equipment",
      "To park vehicles"
    ],
    correctAnswer: 1,
    explanation: "The assembly point is a predetermined safe location away from the building where evacuated personnel gather to be accounted for and receive further instructions.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 198,
    question: "What is the PASS technique for using a fire extinguisher?",
    options: [
      "Push And Shake Strongly",
      "Pull pin, Aim at base, Squeeze handle, Sweep side to side",
      "Point And Spray Slowly",
      "Press All Safety Switches"
    ],
    correctAnswer: 1,
    explanation: "PASS: Pull the pin, Aim the nozzle at the base of the fire, Squeeze the handle, and Sweep from side to side at the base of the flames.",
    section: "1.8",
    difficulty: "basic"
  },
  {
    id: 199,
    question: "What should be reported after any emergency incident?",
    options: [
      "Nothing - emergencies are private",
      "Details of the incident, actions taken, injuries, and lessons learned",
      "Only if someone is injured",
      "Only if property is damaged"
    ],
    correctAnswer: 1,
    explanation: "All emergency incidents should be reported with details of what happened, actions taken, any injuries, damage, near misses, and lessons learned for improvement.",
    section: "1.8",
    difficulty: "intermediate"
  },
  {
    id: 200,
    question: "What are the symptoms of secondary shock (psychological shock) after an accident?",
    options: [
      "No symptoms",
      "Pale, cold clammy skin, rapid weak pulse, nausea, confusion, and anxiety",
      "Only hunger",
      "Only tiredness"
    ],
    correctAnswer: 1,
    explanation: "Shock symptoms include pale grey skin, cold and clammy feel, rapid weak pulse, rapid shallow breathing, nausea, thirst, and mental confusion or anxiety.",
    section: "1.8",
    difficulty: "intermediate"
  }
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module1Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module1Questions.filter(q => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): Question[] => {
  return module1Questions.filter(q => q.difficulty === difficulty);
};

export default module1Questions;
