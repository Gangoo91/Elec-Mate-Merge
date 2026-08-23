// AM2 Mock Exam Question Bank - 400 Questions
// Comprehensive question bank aligned with NET AM2 Assessment requirements
// Topics: Health & Safety, BS 7671, Building Regulations, Safe Isolation, Inspection & Testing, Fault Finding

export interface AM2Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  category:
    | 'Health & Safety'
    | 'BS7671 Fundamentals'
    | 'BS7671 Selection & Erection'
    | 'BS7671 Inspection & Testing'
    | 'Building Regulations'
    | 'Safe Isolation'
    | 'Fault Finding';
}

export const am2QuestionBank: AM2Question[] = [
  // ============================================================
  // HEALTH & SAFETY (70 questions) - IDs 1-70
  // ============================================================

  // HASAWA 1974 (15 questions)
  {
    id: 1,
    question: 'What is the main purpose of the Health and Safety at Work Act 1974?',
    options: [
      'To establish building regulations for electrical installations',
      'To ensure the health, safety and welfare of all persons at work',
      'To provide guidance on electrical installation methods',
      'To regulate the testing and certification of electrical equipment',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA 1974 is the primary legislation ensuring health, safety and welfare of all employees and others who may be affected by work activities.',
    section: 'HASAWA 1974',
    difficulty: 'basic',
    topic: 'Purpose of HASAWA',
    category: 'Health & Safety',
  },
  {
    id: 2,
    question: 'Under HASAWA 1974, who has the primary duty to ensure workplace safety?',
    options: [
      'Employees only',
      'The HSE only',
      'Employers',
      'Trade unions',
    ],
    correctAnswer: 2,
    explanation:
      'Section 2 of HASAWA places the primary duty on employers to ensure, so far as reasonably practicable, the health, safety and welfare of employees.',
    section: 'HASAWA 1974',
    difficulty: 'basic',
    topic: 'Employer Duties',
    category: 'Health & Safety',
  },
  {
    id: 3,
    question: 'What duty do employees have under HASAWA 1974?',
    options: [
      'To provide and maintain all personal protective equipment',
      'To carry out and record workplace risk assessments',
      'To enforce safety legislation across the whole site',
      'To take reasonable care of themselves and others affected by their actions',
    ],
    correctAnswer: 3,
    explanation:
      'Section 7 requires employees to take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions.',
    section: 'HASAWA 1974',
    difficulty: 'intermediate',
    topic: 'Employee Duties',
    category: 'Health & Safety',
  },
  {
    id: 4,
    question: "What does 'so far as is reasonably practicable' mean under HASAWA?",
    options: [
      'Balance the risk against cost, time and effort to reduce it',
      'Reduce the risk regardless of any cost or difficulty involved',
      'Take whatever action the employee considers appropriate',
      'Comply only with the minimum standards set by the HSE',
    ],
    correctAnswer: 0,
    explanation:
      'Reasonably practicable means weighing the risk against the sacrifice (time, trouble, cost) needed to avert or reduce it - not just cost alone.',
    section: 'HASAWA 1974',
    difficulty: 'advanced',
    topic: 'Legal Terms',
    category: 'Health & Safety',
  },
  {
    id: 5,
    question: 'Who enforces HASAWA 1974 in most workplaces?',
    options: [
      'The local authority environmental health department',
      'Health and Safety Executive (HSE)',
      'The Office for Product Safety and Standards',
      'Individual trade unions and safety representatives',
    ],
    correctAnswer: 1,
    explanation:
      'The HSE is the primary enforcing authority for HASAWA 1974 in most workplaces, including construction and electrical work.',
    section: 'HASAWA 1974',
    difficulty: 'basic',
    topic: 'Enforcement',
    category: 'Health & Safety',
  },
  {
    id: 6,
    question: 'What are the maximum penalties for serious breaches of HASAWA 1974?',
    options: [
      'A fixed penalty notice of up to £20,000',
      'A written improvement notice only',
      'Unlimited fine and/or imprisonment',
      'A maximum fine of £5,000 with no custodial option',
    ],
    correctAnswer: 2,
    explanation:
      'Serious breaches can result in unlimited fines and/or imprisonment for up to 2 years (or more for certain offences causing death).',
    section: 'HASAWA 1974',
    difficulty: 'basic',
    topic: 'Penalties',
    category: 'Health & Safety',
  },
  {
    id: 7,
    question: 'Under HASAWA, must employers consult with employees on health and safety matters?',
    options: [
      'No, consultation is entirely at the employer’s discretion',
      'Only where a recognised trade union is present on site',
      'Consultation is only required after a reportable incident',
      'Yes, either directly or through safety representatives',
    ],
    correctAnswer: 3,
    explanation:
      'Employers must consult employees on health and safety matters, either directly or through elected safety representatives.',
    section: 'HASAWA 1974',
    difficulty: 'basic',
    topic: 'Consultation',
    category: 'Health & Safety',
  },

  // Electricity at Work Regulations 1989 (15 questions)
  {
    id: 8,
    question: 'What do the Electricity at Work Regulations 1989 specifically cover?',
    options: [
      'Electrical safety in all workplaces',
      'Electrical safety in dwellings only',
      'The design and manufacture of electrical equipment',
      'Energy efficiency of electrical installations',
    ],
    correctAnswer: 0,
    explanation:
      'EAW Regulations apply to all electrical systems and equipment in workplaces to prevent danger from electricity.',
    section: 'EAW 1989',
    difficulty: 'basic',
    topic: 'Scope',
    category: 'Health & Safety',
  },
  {
    id: 9,
    question: 'Regulation 4 of EAW 1989 requires that electrical systems shall be:',
    options: [
      'Inspected and tested at least once every twelve months',
      'Constructed and maintained to prevent danger',
      'Designed only by a chartered electrical engineer',
      'Fitted with residual current devices on every circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 4 requires all electrical systems to be constructed and maintained so as to prevent danger, so far as reasonably practicable.',
    section: 'EAW 1989',
    difficulty: 'intermediate',
    topic: 'System Requirements',
    category: 'Health & Safety',
  },
  {
    id: 10,
    question: 'Under EAW Regulation 14, when can live working be permitted?',
    options: [
      "Whenever isolating the circuit would be inconvenient for the client",
      "Only when the operative holds a recognised live-working qualification",
      "When it's unreasonable to work dead and suitable precautions are taken",
      "Live working is never permitted under any circumstances",
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 14 states live work is permitted only when unreasonable to work dead and suitable precautions are taken to prevent injury.',
    section: 'EAW 1989',
    difficulty: 'intermediate',
    topic: 'Live Working',
    category: 'Health & Safety',
  },
  {
    id: 11,
    question:
      'What does EAW Regulation 16 require regarding persons working on electrical systems?',
    options: [
      'They must be over 21 years old',
      'They must be employed full-time',
      'They must hold a degree',
      'They must be competent or supervised',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 16 requires persons working on electrical systems to be competent, or if not, to be supervised by a competent person.',
    section: 'EAW 1989',
    difficulty: 'basic',
    topic: 'Competence',
    category: 'Health & Safety',
  },
  {
    id: 12,
    question: 'EAW Regulation 13 requires that adequate precautions be taken to prevent:',
    options: [
      'Electrical equipment being charged accidentally',
      'Electrical equipment overheating during normal use',
      'Unauthorised persons entering the work area',
      'Excessive voltage drop on long final circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 13 requires precautions to prevent electrical equipment that has been made dead from being charged (re-energised) accidentally.',
    section: 'EAW 1989',
    difficulty: 'advanced',
    topic: 'Isolation',
    category: 'Health & Safety',
  },
  {
    id: 13,
    question: "What does 'danger' mean in the context of EAW 1989?",
    options: [
      'Any defect recorded during a periodic inspection',
      'Risk of injury from electric shock, burns, fire or explosion',
      'A circuit operating above its rated current capacity',
      'Any installation not certified to BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'Danger means risk of injury from electric shock, electrical burns, fires of electrical origin, or electrical arcing/explosion.',
    section: 'EAW 1989',
    difficulty: 'basic',
    topic: 'Definitions',
    category: 'Health & Safety',
  },

  // Risk Assessment (10 questions)
  {
    id: 14,
    question: 'What are the five steps to risk assessment?',
    options: [
      'Inspect the workplace, test the equipment, certify it safe, record and review',
      'Plan the work, do the work, check the outcome, act on findings, report to the HSE',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Assess the circuit, isolate it, lock off, prove dead and label the point of isolation',
    ],
    correctAnswer: 2,
    explanation:
      "HSE's five steps: identify hazards, decide who might be harmed and how, evaluate risks and decide on precautions, record findings, review and update.",
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Five Steps',
    category: 'Health & Safety',
  },
  {
    id: 15,
    question: 'What is the difference between a hazard and a risk?',
    options: [
      'A hazard is a minor issue that can be tolerated; a risk is a serious issue needing action',
      'A hazard applies only to people at work; a risk applies only to plant and equipment',
      'A hazard is the likelihood that harm occurs; a risk is the source of that harm',
      'A hazard is something with potential to cause harm; risk is the likelihood of harm occurring',
    ],
    correctAnswer: 3,
    explanation:
      'A hazard is anything that may cause harm. Risk is the chance (high or low) that somebody could be harmed by the hazard.',
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Definitions',
    category: 'Health & Safety',
  },
  {
    id: 16,
    question: 'When should a risk assessment be reviewed?',
    options: [
      'When circumstances change, after incidents, or periodically',
      'Only once, before the work first begins',
      'At the request of an HSE inspector, and at no other time',
      'Every ten years, in line with periodic inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments should be reviewed when significant changes occur, after incidents, when new information emerges, or periodically to ensure they remain valid.',
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Review',
    category: 'Health & Safety',
  },
  {
    id: 17,
    question: 'What is the hierarchy of control for managing risks?',
    options: [
      'PPE, administrative controls, engineering controls, substitution, elimination',
      'Eliminate, substitute, engineering controls, administrative controls, PPE',
      'Identify, evaluate, record, review and communicate the hazard',
      'Isolate, secure, prove dead, label and document the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy: elimination (remove hazard), substitution (use less hazardous), engineering controls, administrative controls, PPE (last resort).',
    section: 'Risk Assessment',
    difficulty: 'advanced',
    topic: 'Control Measures',
    category: 'Health & Safety',
  },
  {
    id: 18,
    question: 'Who should carry out a risk assessment?',
    options: [
      'Any available employee regardless of experience',
      'An external consultant appointed by the HSE',
      'A competent person within the organisation',
      'The most senior manager on site at the time',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessments should be carried out by a competent person - someone with the knowledge, training and experience to identify hazards and risks.',
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Competence',
    category: 'Health & Safety',
  },

  // RIDDOR (10 questions)
  {
    id: 19,
    question: 'What does RIDDOR stand for?',
    options: [
      'Risk Investigation, Detection, Documentation and Organisational Reporting',
      'Recording of Industrial Diseases and Dangerous Operations Register',
      'Regulations for Industrial Danger Detection and Operational Review',
      'Reporting of Injuries, Deaths and Dangerous Occurrences Regulations',
    ],
    correctAnswer: 3,
    explanation:
      'RIDDOR stands for Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013.',
    section: 'RIDDOR',
    difficulty: 'intermediate',
    topic: 'Definition',
    category: 'Health & Safety',
  },
  {
    id: 20,
    question: 'Under RIDDOR, which electrical incidents must be reported?',
    options: [
      'Electric shock or burn causing death, specified injury, or incapacity for more than 7 days',
      'Any electric shock felt by an employee, however minor, including a static discharge',
      'Any circuit that trips its protective device more than once during commissioning',
      'Any installation found to be non-compliant with BS 7671 at periodic inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical incidents causing death, specified injuries, or over-7-day incapacitation must be reported. Dangerous occurrences involving electricity are also reportable.',
    section: 'RIDDOR',
    difficulty: 'intermediate',
    topic: 'Reportable Incidents',
    category: 'Health & Safety',
  },
  {
    id: 21,
    question: 'How quickly must fatal or specified injuries be reported under RIDDOR?',
    options: [
      'Within 15 days of the incident, in writing only',
      'Without delay (immediately) and followed up within 10 days',
      'Within 24 hours, by completing an online form',
      'At the next scheduled health and safety meeting',
    ],
    correctAnswer: 1,
    explanation:
      'Fatal and specified injuries must be reported without delay (by phone to HSE) and followed up in writing within 10 days.',
    section: 'RIDDOR',
    difficulty: 'basic',
    topic: 'Timescales',
    category: 'Health & Safety',
  },
  {
    id: 22,
    question: "What is a 'dangerous occurrence' under RIDDOR?",
    options: [
      'Any injury requiring more than three days off work',
      'Any incident reported to the employer by a member of the public',
      'A near-miss that could have caused serious injury or death',
      'Any breach of the Electricity at Work Regulations',
    ],
    correctAnswer: 2,
    explanation:
      'Dangerous occurrences are specific near-miss events that had the potential to cause death or serious injury, listed in Schedule 2 of RIDDOR.',
    section: 'RIDDOR',
    difficulty: 'advanced',
    topic: 'Dangerous Occurrences',
    category: 'Health & Safety',
  },
  {
    id: 23,
    question: 'Who is responsible for reporting incidents under RIDDOR?',
    options: [
      'The injured person, once they have recovered',
      'Any colleague who witnessed the incident',
      'The HSE inspector assigned to the premises',
      'The responsible person (usually the employer)',
    ],
    correctAnswer: 3,
    explanation:
      'The responsible person, usually the employer or person in control of the premises, must report RIDDOR incidents.',
    section: 'RIDDOR',
    difficulty: 'advanced',
    topic: 'Responsibility',
    category: 'Health & Safety',
  },

  // PPE (10 questions)
  {
    id: 24,
    question: 'According to PPE hierarchy, when should PPE be used?',
    options: [
      'As a last resort when other controls are not reasonably practicable',
      'As the first control measure on every task',
      'Only when an HSE inspector is present on site',
      'Whenever the employee personally chooses to wear it',
    ],
    correctAnswer: 0,
    explanation:
      'PPE should be used as a last resort, after elimination, substitution, engineering and administrative controls have been considered.',
    section: 'PPE',
    difficulty: 'advanced',
    topic: 'Hierarchy',
    category: 'Health & Safety',
  },
  {
    id: 25,
    question: 'Who is responsible for providing PPE in the workplace?',
    options: [
      'The employee, who must buy their own',
      'The employer, free of charge',
      'The client commissioning the work',
      'The main contractor’s insurer',
    ],
    correctAnswer: 1,
    explanation:
      'Under the PPE at Work Regulations, employers must provide suitable PPE free of charge where risks cannot be adequately controlled by other means.',
    section: 'PPE',
    difficulty: 'basic',
    topic: 'Provision',
    category: 'Health & Safety',
  },
  {
    id: 26,
    question: 'What type of safety footwear is typically required for electrical work?',
    options: [
      'Lightweight trainers with reinforced toe caps',
      'Wellington boots with metal shanks',
      'Steel toe-capped boots with anti-static soles',
      'Open work sandals rated to EN ISO 20345',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical work typically requires safety boots with steel toe caps for impact protection and anti-static or insulating soles.',
    section: 'PPE',
    difficulty: 'basic',
    topic: 'Footwear',
    category: 'Health & Safety',
  },
  {
    id: 27,
    question: 'When working near live electrical equipment, what eye protection may be required?',
    options: [
      'Tinted sunglasses to reduce glare',
      'Standard clear reading glasses',
      'A dust mask with an integrated visor',
      'Arc-rated safety glasses or face shield',
    ],
    correctAnswer: 3,
    explanation:
      'Arc-rated safety glasses or face shields protect against arc flash, which can cause severe burns and eye damage from intense light and heat.',
    section: 'PPE',
    difficulty: 'basic',
    topic: 'Eye Protection',
    category: 'Health & Safety',
  },
  {
    id: 28,
    question: "What is the employee's duty regarding PPE?",
    options: [
      'Use it properly, report defects, store it correctly',
      'Provide it for all other workers on site',
      'Modify it to suit the task being undertaken',
      'Replace it at their own expense when worn',
    ],
    correctAnswer: 0,
    explanation:
      'Employees must use PPE properly as trained, report defects or damage, and store it correctly when not in use.',
    section: 'PPE',
    difficulty: 'intermediate',
    topic: 'Employee Duties',
    category: 'Health & Safety',
  },

  // CDM Regulations (5 questions)
  {
    id: 29,
    question: 'What do CDM Regulations apply to?',
    options: [
      'Large commercial building projects, but not refurbishment work',
      'All construction work including electrical installation',
      'Only projects lasting more than 30 working days',
      'Work carried out on domestic dwellings but not on commercial sites',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 applies to all construction work, including electrical installation, maintenance and repair work.',
    section: 'CDM Regulations',
    difficulty: 'basic',
    topic: 'Scope',
    category: 'Health & Safety',
  },
  {
    id: 30,
    question: 'Under CDM, who has duties for construction projects?',
    options: [
      'Only the principal contractor, who must manage every duty on site',
      'The client funding the project, who then passes the duties to others',
      'Clients, principal designers, principal contractors, designers and contractors',
      'The architect and structural engineer who prepare the design',
    ],
    correctAnswer: 2,
    explanation:
      'CDM places duties on all duty holders: clients, principal designers, principal contractors, designers, contractors and workers.',
    section: 'CDM Regulations',
    difficulty: 'basic',
    topic: 'Duty Holders',
    category: 'Health & Safety',
  },
  {
    id: 31,
    question: 'When is a principal contractor required under CDM?',
    options: [
      'Only on projects worth more than £100,000',
      'When the client requests one in writing',
      'On every construction project without exception',
      'When there is more than one contractor on site',
    ],
    correctAnswer: 3,
    explanation:
      'A principal contractor must be appointed when there is more than one contractor working on a construction project.',
    section: 'CDM Regulations',
    difficulty: 'advanced',
    topic: 'Principal Contractor',
    category: 'Health & Safety',
  },

  // Working at Height (5 questions)
  {
    id: 32,
    question: "Under the Work at Height Regulations, what is 'work at height'?",
    options: [
      'Work at any place where a person could fall and be injured',
      'Only work carried out above two metres from the ground',
      'Work undertaken on a scaffold, tower or MEWP platform',
      'Work performed on a roof or other elevated structure',
    ],
    correctAnswer: 0,
    explanation:
      'Work at height means work in any place where a person could fall a distance liable to cause personal injury, including at ground level near holes.',
    section: 'Working at Height',
    difficulty: 'basic',
    topic: 'Definition',
    category: 'Health & Safety',
  },
  {
    id: 33,
    question: 'What is the hierarchy for managing work at height risks?',
    options: [
      'Provide PPE, then issue a permit, then supervise the work',
      'Avoid work at height, prevent falls, minimise consequences of falls',
      'Inspect equipment, train workers, then begin the task',
      'Erect a scaffold, fit guard rails, then add a safety net',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy: avoid work at height where possible, prevent falls using suitable equipment, minimise fall distance/consequences.',
    section: 'Working at Height',
    difficulty: 'intermediate',
    topic: 'Hierarchy',
    category: 'Health & Safety',
  },
  {
    id: 34,
    question: 'Before using a ladder, what checks should be made?',
    options: [
      'Confirm the ladder has been PAT tested within the last year',
      'Ensure the ladder is at least three metres long',
      'Check for damage, ensure suitable for task, correct angle, secure base',
      'Verify the ladder is rated to BS 7671 requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Check ladder condition (no damage), suitability for the task, correct angle (1:4 ratio), and secure placement at base and top.',
    section: 'Working at Height',
    difficulty: 'basic',
    topic: 'Ladder Safety',
    category: 'Health & Safety',
  },

  // ============================================================
  // BS7671 FUNDAMENTALS (60 questions) - IDs 71-130
  // ============================================================

  // Scope and Definitions (10 questions)
  {
    id: 71,
    question: 'What is the scope of BS 7671?',
    options: [
      'The manufacture and testing of electrical equipment',
      'The distribution network up to the supply intake',
      'High-voltage transmission and substation design',
      'Electrical installations in buildings and their surrounds',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 applies to the design, erection and verification of electrical installations in buildings and their surroundings.',
    section: 'Scope',
    difficulty: 'basic',
    topic: 'Application',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 72,
    question: "What voltage does BS 7671 consider as 'Low Voltage' for AC systems?",
    options: [
      'Exceeding 50V but not exceeding 1000V',
      'Not exceeding 50V',
      'Exceeding 1000V but not exceeding 35kV',
      'Exceeding 120V but not exceeding 1500V',
    ],
    correctAnswer: 0,
    explanation:
      'Low voltage for AC is defined as exceeding 50V but not exceeding 1000V AC rms (or 1500V DC).',
    section: 'Definitions',
    difficulty: 'intermediate',
    topic: 'Voltage Bands',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 73,
    question: "What is the definition of 'circuit protective conductor' (cpc)?",
    options: [
      'A conductor carrying the return current under normal operation',
      'A protective conductor connecting exposed-conductive-parts to the main earthing terminal',
      'A conductor bonding extraneous-conductive-parts together at the origin',
      'A conductor connecting the supply neutral to the earth electrode',
    ],
    correctAnswer: 1,
    explanation:
      'A cpc is a protective conductor connecting exposed-conductive-parts to the main earthing terminal within the installation.',
    section: 'Definitions',
    difficulty: 'basic',
    topic: 'Protective Conductors',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 74,
    question: "What is an 'extraneous-conductive-part'?",
    options: [
      'A conductive part of equipment that can become live under fault conditions',
      'A live conductor carrying current during normal operation',
      'A conductive part not forming part of the installation but liable to introduce a potential',
      'A protective conductor connecting equipment to the main earthing terminal',
    ],
    correctAnswer: 2,
    explanation:
      'An extraneous-conductive-part is a conductive part liable to introduce a potential, generally earth potential, and is not part of the electrical installation (e.g., metal pipes, structural steelwork).',
    section: 'Definitions',
    difficulty: 'advanced',
    topic: 'Conductive Parts',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 75,
    question: 'What is the nominal voltage for single-phase supplies in the UK?',
    options: [
      '240V',
      '220V',
      '250V',
      '230V',
    ],
    correctAnswer: 3,
    explanation:
      'The nominal voltage is 230V AC for single-phase supplies, with a tolerance of +10%/-6% giving 216.2V to 253V.',
    section: 'Supply Systems',
    difficulty: 'basic',
    topic: 'Voltage Levels',
    category: 'BS7671 Fundamentals',
  },

  // Protection Against Electric Shock (15 questions)
  {
    id: 76,
    question: 'What are the two types of protection against electric shock?',
    options: [
      'Basic protection and fault protection',
      'Overload protection and short-circuit protection',
      'Insulation protection and bonding protection',
      'Direct protection and indirect protection',
    ],
    correctAnswer: 0,
    explanation:
      'Protection against electric shock consists of basic protection (protection against contact with live parts) and fault protection (protection against contact with exposed-conductive-parts made live by a fault).',
    section: 'Electric Shock',
    difficulty: 'intermediate',
    topic: 'Protection Types',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 77,
    question: 'What is Automatic Disconnection of Supply (ADS)?',
    options: [
      'A device that reconnects the supply automatically after a fault',
      'A protective measure where fault protection is provided by automatic disconnection',
      'A method of limiting voltage drop on long circuits',
      'A means of isolating the supply for maintenance work',
    ],
    correctAnswer: 1,
    explanation:
      'ADS is a protective measure combining basic protection (insulation, barriers) with fault protection by automatic disconnection in the event of a fault.',
    section: 'Electric Shock',
    difficulty: 'basic',
    topic: 'ADS',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 78,
    question: 'What is the maximum disconnection time for a 230V final circuit in a TN system?',
    options: [
      '0.2 seconds',
      '1.0 seconds',
      '0.4 seconds',
      '5.0 seconds',
    ],
    correctAnswer: 2,
    explanation:
      'For 230V TN systems, final circuits must disconnect within 0.4 seconds to prevent dangerous touch voltages persisting.',
    section: 'Electric Shock',
    difficulty: 'intermediate',
    topic: 'Disconnection Times',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 79,
    question: 'What is the maximum disconnection time for a 230V TT system final circuit (Table 41.1)?',
    options: [
      '0.2 seconds',
      '0.4 seconds',
      '5.0 seconds',
      '1.0 seconds',
    ],
    correctAnswer: 0,
    explanation:
      'Under BS 7671 Table 41.1, a 230V TT final circuit must disconnect within 0.2 seconds. The old 1.0s value no longer applies; where ADS relies on an RCD this short time is readily achieved.',
    section: 'Electric Shock',
    difficulty: 'advanced',
    topic: 'Disconnection Times',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 80,
    question: 'What is the purpose of supplementary bonding?',
    options: [
      'To reduce touch voltage between simultaneously accessible parts',
      'To provide a low-impedance return path for fault current',
      'To limit voltage drop across long final circuits',
      'To connect the supply neutral to the earth electrode',
    ],
    correctAnswer: 0,
    explanation:
      'Supplementary bonding reduces potential difference between simultaneously accessible exposed and extraneous-conductive-parts.',
    section: 'Electric Shock',
    difficulty: 'intermediate',
    topic: 'Bonding',
    category: 'BS7671 Fundamentals',
  },

  // Earthing Systems (15 questions)
  {
    id: 81,
    question: 'In a TN-S system, how is the earth connection provided?',
    options: [
      "Via a local earth electrode at the installation",
      "Via a separate metallic connection to the distributor's earth",
      "Via the combined neutral and earth (PEN) conductor",
      "Via the main protective bonding to metallic services",
    ],
    correctAnswer: 1,
    explanation:
      'TN-S has a separate protective conductor (the sheath of the supply cable) providing the earth path back to the transformer.',
    section: 'Earthing Systems',
    difficulty: 'basic',
    topic: 'TN-S',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 82,
    question: 'What does TN-C-S (PME) mean?',
    options: [
      'Separate neutral and protective conductors throughout the supply',
      'A local earth electrode with no distributor earth connection',
      'Combined neutral and protective conductor in supply, separate in installation',
      'Combined neutral and protective conductor throughout the installation',
    ],
    correctAnswer: 2,
    explanation:
      'TN-C-S has combined neutral and earth (PEN) in the supply, separated at the origin into neutral and protective conductors in the installation.',
    section: 'Earthing Systems',
    difficulty: 'basic',
    topic: 'TN-C-S',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 83,
    question: 'In a TT system, how is the installation earthed?',
    options: [
      'Via the metallic sheath of the supply cable',
      'Via the combined neutral and earth (PEN) conductor',
      'Via the distributor’s separate protective conductor',
      'Via an earth electrode at the installation',
    ],
    correctAnswer: 3,
    explanation:
      "TT systems use a local earth electrode (e.g., earth rod) as the installation has no connection to the distributor's earth.",
    section: 'Earthing Systems',
    difficulty: 'basic',
    topic: 'TT System',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 84,
    question: 'What is the typical earth fault loop impedance (Ze) for a TN-S supply?',
    options: [
      '0.8Ω maximum',
      '21Ω maximum',
      '200Ω maximum',
      '0.35Ω maximum',
    ],
    correctAnswer: 0,
    explanation:
      'TN-S supplies typically have Ze values up to 0.8Ω, as specified in the Electricity Safety, Quality and Continuity Regulations.',
    section: 'Earthing Systems',
    difficulty: 'intermediate',
    topic: 'Ze Values',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 85,
    question: 'What is the typical Ze value for a TN-C-S (PME) supply?',
    options: [
      '0.8Ω maximum',
      '0.35Ω maximum',
      '200Ω maximum',
      '21Ω maximum',
    ],
    correctAnswer: 1,
    explanation:
      'TN-C-S (PME) supplies typically have Ze values up to 0.35Ω due to the parallel earth paths.',
    section: 'Earthing Systems',
    difficulty: 'intermediate',
    topic: 'Ze Values',
    category: 'BS7671 Fundamentals',
  },

  // Protection Against Overcurrent (10 questions)
  {
    id: 86,
    question: 'What are the two types of overcurrent?',
    options: [
      'Earth leakage current and residual current',
      'Inrush current and standing current',
      'Overload and fault current (short-circuit)',
      'Touch current and protective conductor current',
    ],
    correctAnswer: 2,
    explanation:
      'Overcurrent includes overload current (excess current in a circuit that is electrically sound) and fault current (from a short-circuit or earth fault).',
    section: 'Overcurrent',
    difficulty: 'basic',
    topic: 'Types',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 87,
    question: 'What is the breaking capacity (Icn) of a protective device?',
    options: [
      'The current at which the device trips on overload',
      'The rated current the device carries continuously',
      'The residual current at which the device operates',
      'The maximum fault current the device can safely interrupt',
    ],
    correctAnswer: 3,
    explanation:
      'Breaking capacity is the maximum prospective fault current that the device can safely interrupt without damage.',
    section: 'Overcurrent',
    difficulty: 'intermediate',
    topic: 'Breaking Capacity',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 88,
    question: 'What is the purpose of discrimination between protective devices?',
    options: [
      'To ensure only the device nearest the fault operates',
      'To ensure all upstream devices operate together',
      'To increase the breaking capacity of each device',
      'To reduce the disconnection time of the main switch',
    ],
    correctAnswer: 0,
    explanation:
      'Discrimination (selectivity) ensures that only the protective device nearest to the fault operates, minimising disruption to other circuits.',
    section: 'Overcurrent',
    difficulty: 'intermediate',
    topic: 'Discrimination',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 89,
    question: 'What tripping characteristic does a Type B MCB have?',
    options: [
      'Trips between 2 and 3 times rated current',
      'Trips between 3 and 5 times rated current',
      'Trips between 5 and 10 times rated current',
      'Trips between 10 and 20 times rated current',
    ],
    correctAnswer: 1,
    explanation:
      'Type B MCBs trip magnetically between 3 and 5 times their rated current, suitable for resistive loads.',
    section: 'Overcurrent',
    difficulty: 'intermediate',
    topic: 'MCB Types',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 90,
    question: 'What is the application for Type C MCBs?',
    options: [
      'Purely resistive loads such as heating circuits',
      'Lighting circuits with no inrush current',
      'Circuits with moderate inrush currents like motors',
      'Circuits with very high inrush like X-ray equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Type C MCBs (trip at 5-10 × In) are suitable for circuits with moderate inrush currents such as small motors and fluorescent lighting.',
    section: 'Overcurrent',
    difficulty: 'intermediate',
    topic: 'MCB Types',
    category: 'BS7671 Fundamentals',
  },

  // Fundamental Principles (10 questions)
  {
    id: 91,
    question: 'What are the fundamental principles of good workmanship in BS 7671?',
    options: [
      'Using the cheapest compliant materials available',
      'Completing the work as quickly as the client requires',
      'Following only the manufacturer’s instructions',
      'Skilled, competent work using proper materials and techniques',
    ],
    correctAnswer: 3,
    explanation:
      'Good workmanship requires skilled persons using proper materials, following sound techniques, and meeting the requirements of the standard.',
    section: 'Principles',
    difficulty: 'basic',
    topic: 'Workmanship',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 92,
    question: 'What documentation must be provided on completion of an installation?',
    options: [
      'Electrical Installation Certificate with schedule of test results',
      'A risk assessment and method statement only',
      'A manufacturer’s warranty for the consumer unit',
      'A Building Regulations notice from the local authority',
    ],
    correctAnswer: 0,
    explanation:
      'An Electrical Installation Certificate (or Minor Works Certificate) must be provided with schedule of inspections and test results.',
    section: 'Principles',
    difficulty: 'basic',
    topic: 'Certification',
    category: 'BS7671 Fundamentals',
  },

  // ============================================================
  // BS7671 SELECTION & ERECTION (60 questions) - IDs 131-190
  // ============================================================

  // Cable Selection (20 questions)
  {
    id: 131,
    question: 'What factors affect the current-carrying capacity of a cable?',
    options: [
      'Conductor colour, length and number of cores',
      'Supply voltage, frequency and earthing system',
      'Circuit protective device type and breaking capacity',
      'Installation method, ambient temperature, grouping, thermal insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Current-carrying capacity depends on installation method (Appendix 4), ambient temperature (Ca), grouping (Cg), and thermal insulation (Ci).',
    section: 'Cable Selection',
    difficulty: 'basic',
    topic: 'Current Capacity',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 132,
    question: 'What is the minimum cable cross-sectional area for lighting circuits?',
    options: [
      '1.0mm²',
      '1.5mm²',
      '2.5mm²',
      '0.5mm²',
    ],
    correctAnswer: 0,
    explanation:
      'The minimum conductor size for lighting circuits is generally 1.0mm² for copper conductors.',
    section: 'Cable Selection',
    difficulty: 'basic',
    topic: 'Minimum Sizes',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 133,
    question:
      'What is the minimum cable size for socket outlet circuits using ring final circuit design?',
    options: [
      '1.0mm²',
      '2.5mm²',
      '1.5mm²',
      '4.0mm²',
    ],
    correctAnswer: 1,
    explanation:
      'Ring final circuits are typically wired in 2.5mm² cable, protected by a 32A device.',
    section: 'Cable Selection',
    difficulty: 'basic',
    topic: 'Socket Circuits',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 134,
    question: 'When selecting cable size, what does voltage drop need to be limited to?',
    options: [
      '5% of nominal voltage for lighting, 3% for other uses',
      '2% of nominal voltage for all circuits',
      '3% of nominal voltage for lighting, 5% for other uses',
      '10% of nominal voltage for all circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Voltage drop should not exceed 3% for lighting and 5% for other uses of the nominal voltage (BS 7671 Appendix 4).',
    section: 'Cable Selection',
    difficulty: 'advanced',
    topic: 'Voltage Drop',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 135,
    question: 'What is the correction factor (Ca) used for?',
    options: [
      'Correcting for cables grouped closely together',
      'Correcting for cables surrounded by thermal insulation',
      'Correcting for the type of protective device used',
      'Correcting for ambient temperature different from 30°C',
    ],
    correctAnswer: 3,
    explanation:
      'Ca is the ambient temperature correction factor applied when the ambient temperature differs from the reference 30°C.',
    section: 'Cable Selection',
    difficulty: 'intermediate',
    topic: 'Correction Factors',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 136,
    question: 'What does the grouping factor (Cg) account for?',
    options: [
      'Reduced heat dissipation when cables are grouped together',
      'Increased ambient temperature around the cable',
      'Reduced capacity where cables pass through insulation',
      'The number of circuits sharing one protective device',
    ],
    correctAnswer: 0,
    explanation:
      'Cg accounts for reduced heat dissipation when cables are grouped, requiring derating of current-carrying capacity.',
    section: 'Cable Selection',
    difficulty: 'intermediate',
    topic: 'Correction Factors',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 137,
    question: 'When installing cables in thermal insulation, which factor applies?',
    options: [
      'Ca (ambient temperature factor)',
      'Ci (thermal insulation factor)',
      'Cg (grouping factor)',
      'Cf (fuse correction factor)',
    ],
    correctAnswer: 1,
    explanation:
      'Ci applies when cables are installed in or surrounded by thermal insulation, typically 0.5 for cables totally surrounded.',
    section: 'Cable Selection',
    difficulty: 'intermediate',
    topic: 'Thermal Insulation',
    category: 'BS7671 Selection & Erection',
  },

  // Protective Devices (15 questions)
  {
    id: 138,
    question: 'What is the difference between an RCD and an RCBO?',
    options: [
      'An RCD provides overcurrent protection; an RCBO does not',
      'An RCBO only detects earth leakage, not overload',
      'An RCBO combines RCD protection with overcurrent protection',
      'An RCD is for single-phase only; an RCBO for three-phase',
    ],
    correctAnswer: 2,
    explanation:
      'An RCBO combines the functions of an RCD (residual current protection) and an MCB (overcurrent protection) in one device.',
    section: 'Protective Devices',
    difficulty: 'basic',
    topic: 'RCBOs',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 139,
    question:
      'What is the maximum rated residual operating current for additional protection RCDs?',
    options: [
      '100mA',
      '10mA',
      '300mA',
      '30mA',
    ],
    correctAnswer: 3,
    explanation:
      'Additional protection requires RCDs with rated residual operating current (IΔn) not exceeding 30mA and operating time not exceeding 40ms at 5×IΔn.',
    section: 'Protective Devices',
    difficulty: 'intermediate',
    topic: 'RCD Rating',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 140,
    question: 'When is additional protection by 30mA RCD required?',
    options: [
      'For socket outlets up to 32A and mobile equipment outdoors',
      'Only for circuits supplying fixed heating appliances',
      'For three-phase distribution circuits feeding sub-boards',
      'Where the earthing arrangement is TT rather than TN-S',
    ],
    correctAnswer: 0,
    explanation:
      'Additional protection by 30mA RCD is required for socket outlets ≤32A and mobile equipment used outdoors (411.3.3).',
    section: 'Protective Devices',
    difficulty: 'basic',
    topic: 'Additional Protection',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 141,
    question: 'What type of RCD should be used where loads may produce DC components?',
    options: [
      'Type S',
      'Type A or Type B',
      'Type AC',
      'Any type',
    ],
    correctAnswer: 1,
    explanation:
      'Type A RCDs detect pulsating DC, Type B detects smooth DC. Type AC only detects AC residual currents.',
    section: 'Protective Devices',
    difficulty: 'intermediate',
    topic: 'RCD Types',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 142,
    question: 'What is a Type D MCB used for?',
    options: [
      'Purely resistive circuits such as immersion heaters and storage heating',
      'General lighting and socket-outlet final circuits in domestic premises',
      'Circuits with very high inrush currents like transformers and X-ray equipment',
      'Circuits requiring additional protection by residual current device',
    ],
    correctAnswer: 2,
    explanation:
      'Type D MCBs (trip at 10-20 × In) are for circuits with very high inrush currents like transformers, welding equipment, X-ray machines.',
    section: 'Protective Devices',
    difficulty: 'basic',
    topic: 'MCB Types',
    category: 'BS7671 Selection & Erection',
  },

  // Earthing and Bonding (15 questions)
  {
    id: 143,
    question: 'What is the minimum size of the main earthing conductor for a TN-S system?',
    options: [
      'Always 6mm² copper regardless of supply size',
      'Always the same size as the line conductor',
      'Always 25mm² copper for any installation',
      'Depends on supply conductor size - refer to Table 54.7',
    ],
    correctAnswer: 3,
    explanation:
      'Main earthing conductor size is determined from the line conductor size using the adiabatic method or Table 54.7 (54.8 in A4).',
    section: 'Earthing',
    difficulty: 'basic',
    topic: 'Conductor Sizing',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 144,
    question:
      'What is the minimum size of main protective bonding conductors for supply up to 35mm²?',
    options: [
      '10mm² copper',
      '6mm² copper',
      '16mm² copper',
      '25mm² copper',
    ],
    correctAnswer: 0,
    explanation:
      'For supply conductors up to and including 35mm² copper, main bonding conductors must be at least 10mm² copper.',
    section: 'Bonding',
    difficulty: 'advanced',
    topic: 'Bonding Size',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 145,
    question: 'What extraneous-conductive-parts require main protective bonding?',
    options: [
      'Only metal water pipes within the bathroom, where supplementary bonding applies',
      'Gas, water, oil pipes, structural steel, central heating and air conditioning systems',
      'The consumer unit enclosure and meter tails at the origin of the installation',
      'All plastic service pipes entering the building below ground level',
    ],
    correctAnswer: 1,
    explanation:
      'Main bonding is required to gas, water, oil pipes, structural metalwork, and metallic service pipes (411.3.1.2).',
    section: 'Bonding',
    difficulty: 'basic',
    topic: 'What to Bond',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 146,
    question: 'Where should main protective bonding connections be made?',
    options: [
      'At the most remote point of the installation',
      'At the consumer unit only, regardless of service entry',
      'As close as practicable to the point of entry to the building',
      'Within 600mm of any final socket outlet',
    ],
    correctAnswer: 2,
    explanation:
      'Main bonding connections should be made as close as practicable to the point of entry of the service into the building.',
    section: 'Bonding',
    difficulty: 'intermediate',
    topic: 'Bonding Location',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 147,
    question: 'What colour identification should earthing and bonding conductors have?',
    options: [
      'Blue throughout the installation',
      'Brown with a green sleeve at terminations',
      'Plain green only',
      'Green and yellow bi-colour',
    ],
    correctAnswer: 3,
    explanation:
      'Protective conductors, including earthing and bonding conductors, must be identified by green and yellow bi-colour.',
    section: 'Earthing',
    difficulty: 'basic',
    topic: 'Identification',
    category: 'BS7671 Selection & Erection',
  },

  // Special Locations (10 questions)
  {
    id: 148,
    question: 'In a bathroom, what is Zone 0?',
    options: [
      'The interior of the bath or shower tray',
      'The area within 0.6m of the bath edge',
      'The space directly above the bath to 2.25m',
      'The whole room containing the bath or shower',
    ],
    correctAnswer: 0,
    explanation:
      'Zone 0 is the interior of the bath tub or shower basin, requiring IPX7 equipment only (suitable for immersion).',
    section: 'Special Locations',
    difficulty: 'intermediate',
    topic: 'Bathroom Zones',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 149,
    question: 'What is the extent of Zone 1 in a bathroom?',
    options: [
      'The interior of the bath or shower basin only',
      'Above the bath/shower to 2.25m from floor level',
      'The area 0.6m horizontally beyond Zone 1',
      'The entire room up to ceiling level',
    ],
    correctAnswer: 1,
    explanation:
      'Zone 1 extends from the finished floor to 2.25m above, limited by the vertical plane of the bath/shower edge.',
    section: 'Special Locations',
    difficulty: 'intermediate',
    topic: 'Bathroom Zones',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 150,
    question: 'What IP rating is required for equipment in Zone 1 of a bathroom?',
    options: [
      'IPX0 (no water protection required)',
      'IPX7 (suitable for temporary immersion)',
      'IPX4 minimum (IPX5 where water jets are used for cleaning)',
      'IPX2 (protection against dripping water)',
    ],
    correctAnswer: 2,
    explanation:
      'Zone 1 requires minimum IPX4 protection (against splashing), increased to IPX5 where water jets are used for cleaning.',
    section: 'Special Locations',
    difficulty: 'intermediate',
    topic: 'IP Ratings',
    category: 'BS7671 Selection & Erection',
  },

  // ============================================================
  // BS7671 INSPECTION & TESTING (60 questions) - IDs 191-250
  // ============================================================

  // Initial Verification (15 questions)
  {
    id: 191,
    question: 'What is the correct sequence for initial verification tests?',
    options: [
      'Zs, RCD operation, polarity, insulation resistance, continuity',
      'Insulation resistance, continuity, RCD, polarity, Zs',
      'RCD operation, Zs, polarity, continuity, insulation resistance',
      'Continuity of protective conductors, insulation resistance, polarity, Zs, RCD',
    ],
    correctAnswer: 3,
    explanation:
      'The sequence per GN3: continuity of protective/bonding conductors, ring continuity, insulation resistance, polarity, Zs, functional tests (RCDs).',
    section: 'Testing Sequence',
    difficulty: 'basic',
    topic: 'Test Order',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 192,
    question: 'What instrument is used for testing continuity of protective conductors?',
    options: [
      'Low resistance ohmmeter',
      'Insulation resistance tester',
      'Earth fault loop impedance tester',
      'RCD tester',
    ],
    correctAnswer: 0,
    explanation:
      'A low resistance ohmmeter (typically producing 200mA minimum at 4-24V DC) is used for continuity testing.',
    section: 'Test Instruments',
    difficulty: 'basic',
    topic: 'Continuity Testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 193,
    question: 'What test voltage is used for insulation resistance testing on 230V circuits?',
    options: [
      '230V AC',
      '500V DC',
      '250V DC',
      '1000V DC',
    ],
    correctAnswer: 1,
    explanation:
      'For circuits up to 500V, including standard 230V circuits, insulation resistance is tested at 500V DC.',
    section: 'Insulation Testing',
    difficulty: 'basic',
    topic: 'Test Voltage',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 194,
    question: 'What is the minimum acceptable insulation resistance for a 230V circuit?',
    options: [
      '0.5MΩ',
      '2.0MΩ',
      '1.0MΩ',
      '0.25MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum insulation resistance for circuits up to 500V is 1.0MΩ (Table 6.1 of BS 7671).',
    section: 'Insulation Testing',
    difficulty: 'basic',
    topic: 'Minimum Values',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 195,
    question: 'Before conducting insulation resistance tests, what precautions must be taken?',
    options: [
      'Energise the circuit to confirm it is live first',
      'Connect all loads and appliances to the circuit',
      'Link line and neutral together at the consumer unit',
      'Disconnect sensitive electronic equipment, ensure circuit is isolated',
    ],
    correctAnswer: 3,
    explanation:
      'Disconnect/isolate sensitive electronic equipment that could be damaged by 500V test voltage, and ensure the circuit is de-energised.',
    section: 'Insulation Testing',
    difficulty: 'basic',
    topic: 'Safety Precautions',
    category: 'BS7671 Inspection & Testing',
  },

  // Earth Fault Loop Impedance (15 questions)
  {
    id: 196,
    question: 'What is the formula for earth fault loop impedance?',
    options: [
      'Zs = Ze + R1 + R2',
      'Zs = R1 + R2 only',
      'Zs = Ze × R1 × R2',
      'Zs = Ze - R1 - R2',
    ],
    correctAnswer: 0,
    explanation:
      'Zs = Ze + (R1 + R2), where Ze is external loop impedance, R1 is line conductor resistance, R2 is cpc resistance.',
    section: 'Loop Impedance',
    difficulty: 'basic',
    topic: 'Zs Formula',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 197,
    question: 'Why must measured Zs values be lower than tabulated maximum values?',
    options: [
      'To allow for the stated accuracy tolerance of the test instrument',
      'To allow for increased resistance when conductors are at operating temperature',
      'To allow for additional circuits being added to the board later',
      'To allow for the supply voltage rising above its nominal value',
    ],
    correctAnswer: 1,
    explanation:
      'Measured values (typically at 20°C) must be lower than maximum tabulated values to allow for increased resistance at conductor operating temperature (around 70°C).',
    section: 'Loop Impedance',
    difficulty: 'intermediate',
    topic: 'Temperature Correction',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 198,
    question: 'What is the maximum Zs for a 32A Type B MCB in a 0.4 second circuit?',
    options: [
      '0.86Ω',
      '1.37Ω',
      '1.44Ω',
      '2.30Ω',
    ],
    correctAnswer: 1,
    explanation:
      'For a 32A Type B MCB (trips at 5×In = 160A), Zs max = (Cmin × Uo)/Ia = (0.95 × 230)/160 = 1.37Ω per Table 41.3. 1.44Ω is the old pre-Cmin figure.',
    section: 'Loop Impedance',
    difficulty: 'basic',
    topic: 'Zs Values',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 199,
    question: 'How can R1+R2 be measured for a circuit?',
    options: [
      'By applying a 500V DC test between the line and earth conductors at the board',
      'By measuring the earth fault loop impedance at the origin of the circuit only',
      'By energising the circuit and measuring the load current with a clamp meter',
      'By measuring at the origin with line and cpc connected and measuring at the furthest point',
    ],
    correctAnswer: 3,
    explanation:
      'Connect line and cpc together at the origin, measure resistance at the furthest point. This gives R1+R2 directly.',
    section: 'Loop Impedance',
    difficulty: 'basic',
    topic: 'R1+R2 Measurement',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 200,
    question: 'What two methods can be used to determine earth fault loop impedance (Zs)?',
    options: [
      'Live earth loop impedance testing or calculation from Ze and R1+R2',
      'Insulation resistance testing or continuity testing',
      'Polarity testing or prospective fault current testing',
      'RCD ramp testing or functional testing',
    ],
    correctAnswer: 0,
    explanation:
      'Zs can be measured directly with a loop impedance tester on a live circuit, or calculated from Ze + (R1+R2) measured separately.',
    section: 'Loop Impedance',
    difficulty: 'basic',
    topic: 'Test Methods',
    category: 'BS7671 Inspection & Testing',
  },

  // RCD Testing (15 questions)
  {
    id: 201,
    question: 'At what current should a 30mA RCD trip when tested between 50% and 100% of its rating?',
    options: [
      'Between 5mA and 15mA (up to 50% of rated current)',
      'Between 15mA and 30mA (50-100% of rated current)',
      'Between 30mA and 60mA (100-200% of rated current)',
      'Between 60mA and 150mA (200-500% of rated current)',
    ],
    correctAnswer: 1,
    explanation:
      'An RCD should trip between 50% and 100% of its rated residual current - for 30mA, between 15mA and 30mA.',
    section: 'RCD Testing',
    difficulty: 'basic',
    topic: 'Trip Current',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 202,
    question: 'What is the maximum trip time for a 30mA RCD at rated residual current?',
    options: [
      '40ms',
      '1000ms',
      '300ms',
      '100ms',
    ],
    correctAnswer: 2,
    explanation:
      'At rated residual current (IΔn), general RCDs must trip within 300ms (0.3 seconds).',
    section: 'RCD Testing',
    difficulty: 'intermediate',
    topic: 'Trip Times',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 203,
    question:
      'Under BS 7671:2018+A4:2026, how is the effectiveness of a 30 mA RCD verified?',
    options: [
      'A single AC test at IΔn, disconnecting within 300 ms',
      'A test at 5x IΔn, disconnecting within 40 ms',
      'Tests at half, 1x and 5x IΔn in sequence',
      'The integral test button, operated twice',
    ],
    correctAnswer: 0,
    explanation:
      'Table 3A has been deleted from Appendix 3. Regardless of RCD Type, effectiveness is deemed verified by a single alternating current test at the rated residual operating current: within 300 ms maximum for a general non-delay device, or between 130 ms minimum and 500 ms maximum for a delay S type.',
    section: 'RCD Testing',
    difficulty: 'advanced',
    topic: 'Additional Protection',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 204,
    question: 'How often should RCDs be tested using the test button?',
    options: [
      'Quarterly by the user',
      'Annually by the installer',
      'Never',
      'Only during periodic inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Users should operate the test button quarterly (every 3 months) to confirm the RCD trips correctly.',
    section: 'RCD Testing',
    difficulty: 'intermediate',
    topic: 'User Testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 205,
    question: 'What does an RCD tester actually measure?',
    options: [
      'The earth fault loop impedance of the circuit',
      'Time taken for RCD to trip at various test currents',
      'The insulation resistance between live conductors',
      'The prospective fault current at the RCD terminals',
    ],
    correctAnswer: 1,
    explanation:
      'An RCD tester creates a controlled imbalance current and measures the time taken for the RCD to trip.',
    section: 'RCD Testing',
    difficulty: 'basic',
    topic: 'RCD Testers',
    category: 'BS7671 Inspection & Testing',
  },

  // Ring Final Circuit Testing (10 questions)
  {
    id: 206,
    question: 'What is the first test in ring final circuit continuity testing?',
    options: [
      'Measure the insulation resistance between conductors',
      'Cross-connect line and neutral at the consumer unit',
      'Measure end-to-end resistance of each conductor (L, N, E)',
      'Measure the loop impedance at the furthest socket',
    ],
    correctAnswer: 2,
    explanation:
      'First measure the end-to-end resistance of each conductor by temporarily linking L-L, N-N, E-E at the consumer unit.',
    section: 'Ring Circuits',
    difficulty: 'basic',
    topic: 'Test Procedure',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 207,
    question:
      'In ring final circuit testing, what should the line and neutral end-to-end readings be?',
    options: [
      'Line should be roughly 1.67 times the neutral reading',
      'Neutral should read close to zero ohms',
      'Line should read approximately double the neutral',
      'Substantially the same (within 0.05Ω)',
    ],
    correctAnswer: 3,
    explanation:
      'Line and neutral should have substantially the same resistance as they are the same size conductor in the same cable.',
    section: 'Ring Circuits',
    difficulty: 'basic',
    topic: 'Expected Values',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 208,
    question:
      'Why might the earth conductor have a different end-to-end resistance than line and neutral in a ring?',
    options: [
      'The cpc may be a smaller cross-sectional area',
      'The cpc carries no current during the test',
      'The cpc is connected in a star rather than a ring',
      'The cpc is made from aluminium rather than copper',
    ],
    correctAnswer: 0,
    explanation:
      'In twin and earth cable, the cpc is often smaller (e.g., 1.5mm² with 2.5mm² L/N), giving higher resistance.',
    section: 'Ring Circuits',
    difficulty: 'basic',
    topic: 'Conductor Sizes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 209,
    question: 'After measuring end-to-end resistance, what is the next step in ring testing?',
    options: [
      'Carry out an insulation resistance test on the ring',
      'Cross-connect L1-N2, N1-L2 and E1-E2, then measure at each socket',
      'Measure the prospective fault current at the board',
      'Energise the ring and check the polarity at each socket',
    ],
    correctAnswer: 1,
    explanation:
      'Cross-connect conductors at consumer unit (L1-N2, N1-L2, E1-E2), then measure at each socket to verify ring continuity.',
    section: 'Ring Circuits',
    difficulty: 'basic',
    topic: 'Cross-Connection',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 210,
    question: 'What reading should be obtained at each socket after cross-connecting?',
    options: [
      'A steadily increasing value towards the far end of the ring',
      'A reading equal to the full end-to-end resistance',
      'Approximately the same (should be r1+rn)/4 or (r1+r2)/4',
      'Close to zero ohms at every socket on the ring',
    ],
    correctAnswer: 2,
    explanation:
      'Each socket should read approximately the same, equal to (r1+rn)/4 or (r1+r2)/4 due to the parallel paths.',
    section: 'Ring Circuits',
    difficulty: 'intermediate',
    topic: 'Expected Values',
    category: 'BS7671 Inspection & Testing',
  },

  // Documentation (5 questions)
  {
    id: 211,
    question: 'What certificate is required for a new electrical installation?',
    options: [
      'Minor Works Certificate',
      'No certificate required',
      'Domestic Installer Certificate',
      'Electrical Installation Certificate',
    ],
    correctAnswer: 3,
    explanation:
      'A full Electrical Installation Certificate is required for new installations, with schedule of inspections and test results.',
    section: 'Documentation',
    difficulty: 'basic',
    topic: 'Certificates',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 212,
    question: 'When can a Minor Works Certificate be used?',
    options: [
      'For minor work not involving a new circuit',
      'For the installation of any new final circuit',
      'For a complete rewire of an existing dwelling',
      'For any work, as an alternative to a full EIC',
    ],
    correctAnswer: 0,
    explanation:
      'A Minor Works Certificate is for additions/alterations that do not involve adding a new circuit to the installation.',
    section: 'Documentation',
    difficulty: 'intermediate',
    topic: 'Certificates',
    category: 'BS7671 Inspection & Testing',
  },

  // ============================================================
  // BUILDING REGULATIONS PART P (50 questions) - IDs 251-300
  // ============================================================

  // Part P Requirements (20 questions)
  {
    id: 251,
    question: 'What does Part P of the Building Regulations cover?',
    options: [
      'Electrical safety in commercial premises',
      'Structural fire protection of buildings',
      'Ventilation and air quality in dwellings',
      'Electrical safety in dwellings',
    ],
    correctAnswer: 3,
    explanation:
      'Part P covers electrical safety in dwellings and applies to England (similar requirements in Wales, Scotland and N. Ireland).',
    section: 'Part P',
    difficulty: 'basic',
    topic: 'Scope',
    category: 'Building Regulations',
  },
  {
    id: 252,
    question: 'To which buildings does Part P apply?',
    options: [
      'Dwellings including houses, flats, and communal areas',
      'Offices, shops and other commercial buildings',
      'Industrial and agricultural premises only',
      'All buildings connected to the public supply',
    ],
    correctAnswer: 0,
    explanation:
      'Part P applies to dwellings, including dwelling houses, flats, and associated land and outbuildings/garden structures.',
    section: 'Part P',
    difficulty: 'intermediate',
    topic: 'Application',
    category: 'Building Regulations',
  },
  {
    id: 253,
    question: 'What is notifiable work under Part P?',
    options: [
      'Replacing an accessory such as a socket or switch',
      'Work in special locations or involving new circuits',
      'Adding a fused spur outside a special location',
      'Any repair to an existing electrical fault',
    ],
    correctAnswer: 1,
    explanation:
      'Notifiable work includes work in special locations (bathrooms, swimming pools), new circuits, and consumer unit replacement.',
    section: 'Part P',
    difficulty: 'intermediate',
    topic: 'Notification',
    category: 'Building Regulations',
  },
  {
    id: 254,
    question: 'Which of these is notifiable work under Part P?',
    options: [
      'Replacing a damaged socket outlet',
      'Adding a spur to a ring final circuit',
      'Installing a new circuit',
      'Replacing a light fitting',
    ],
    correctAnswer: 2,
    explanation:
      'Installing a new circuit is notifiable. Simple replacements and non-notifiable additions like fused spurs do not require notification.',
    section: 'Part P',
    difficulty: 'basic',
    topic: 'Notifiable Work',
    category: 'Building Regulations',
  },
  {
    id: 255,
    question:
      'What are the special locations under Part P where all electrical work is notifiable?',
    options: [
      'Kitchens, utility rooms, and garages',
      'Loft spaces, cellars, and outbuildings',
      'Hallways, landings, and stairwells',
      'Bathrooms, swimming pools, and hot tub areas',
    ],
    correctAnswer: 3,
    explanation:
      'Special locations include rooms with a bath or shower, swimming pool/paddling pool areas, and hot tub areas where all electrical work is notifiable.',
    section: 'Part P',
    difficulty: 'basic',
    topic: 'Special Locations',
    category: 'Building Regulations',
  },

  // Competent Person Schemes (15 questions)
  {
    id: 256,
    question: 'What is a competent person scheme?',
    options: [
      'A scheme allowing registered electricians to self-certify notifiable work',
      'A government register of qualified building control officers',
      'A scheme that trains apprentices towards qualification',
      'An insurance scheme covering defective electrical work',
    ],
    correctAnswer: 0,
    explanation:
      'Competent person schemes allow registered installers to self-certify their work as compliant without building control involvement.',
    section: 'CPS',
    difficulty: 'intermediate',
    topic: 'Definition',
    category: 'Building Regulations',
  },
  {
    id: 257,
    question: 'Name a competent person scheme for electrical work.',
    options: [
      'HSE, RIDDOR, COSHH, or PUWER',
      'NAPIT, NICEIC, ELECSA, or Stroma',
      'BSI, IET, JIB, or ECA',
      'CSCS, ECS, CITB, or SmartCard',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical competent person schemes include NAPIT, NICEIC, ELECSA, and several others approved by government.',
    section: 'CPS',
    difficulty: 'intermediate',
    topic: 'Scheme Names',
    category: 'Building Regulations',
  },
  {
    id: 258,
    question: 'What must a competent person scheme member do after completing notifiable work?',
    options: [
      'Apply to building control for retrospective approval',
      'Wait for a building control officer to inspect the work',
      'Notify the scheme and provide certificate to customer and local authority',
      'Display a compliance notice at the property for 28 days',
    ],
    correctAnswer: 2,
    explanation:
      'Members must notify their scheme, provide a Building Regulations Compliance Certificate, and the scheme notifies the local authority.',
    section: 'CPS',
    difficulty: 'basic',
    topic: 'Requirements',
    category: 'Building Regulations',
  },
  {
    id: 259,
    question:
      'If an installer is not registered with a competent person scheme, how can notifiable work be certified?',
    options: [
      'By issuing their own Electrical Installation Certificate only',
      'By asking a registered electrician to sign off the work afterwards',
      'By submitting the certificate to the HSE for approval',
      'By notifying building control before starting and arranging inspection',
    ],
    correctAnswer: 3,
    explanation:
      'Non-registered installers must notify building control before starting work and arrange for inspection/certification.',
    section: 'Building Control',
    difficulty: 'intermediate',
    topic: 'Alternative Route',
    category: 'Building Regulations',
  },
  {
    id: 260,
    question: 'What certificate should a customer receive for notifiable electrical work?',
    options: [
      'Building Regulations Compliance Certificate (plus BS 7671 certificate)',
      'A RIDDOR report confirming no incidents occurred',
      'A CSCS card confirming the installer’s competence',
      'A manufacturer’s warranty for the equipment installed',
    ],
    correctAnswer: 0,
    explanation:
      'Customers should receive a Building Regulations Compliance Certificate along with the appropriate BS 7671 certificate.',
    section: 'Certification',
    difficulty: 'basic',
    topic: 'Documentation',
    category: 'Building Regulations',
  },

  // Non-notifiable Work (15 questions)
  {
    id: 261,
    question: 'Which of these is non-notifiable work under Part P?',
    options: [
      'Installing a new final circuit from the consumer unit in a kitchen',
      'Adding a socket outlet to an existing circuit (not in special location)',
      'Replacing the consumer unit and all of its protective devices',
      'Installing a new circuit in a room containing a bath or shower',
    ],
    correctAnswer: 1,
    explanation:
      'Adding a socket to an existing circuit outside special locations is non-notifiable (but must still comply with BS 7671).',
    section: 'Non-notifiable',
    difficulty: 'basic',
    topic: 'Examples',
    category: 'Building Regulations',
  },
  {
    id: 262,
    question: 'Although not notifiable, what must all electrical work still comply with?',
    options: [
      'The customer\'s written specification only',
      'Part P only, not the wiring regulations',
      'BS 7671 and Part P requirements',
      'Only manufacturer instructions',
    ],
    correctAnswer: 2,
    explanation:
      'All electrical work, whether notifiable or not, must comply with BS 7671 and meet the requirements of Part P.',
    section: 'Compliance',
    difficulty: 'basic',
    topic: 'Standards',
    category: 'Building Regulations',
  },
  {
    id: 263,
    question: 'Is replacing a consumer unit notifiable work?',
    options: [
      'No, it is a like-for-like accessory replacement',
      'No, provided the same number of circuits is used',
      'Only if a new circuit is added at the same time',
      'Yes, it involves the origin of the installation',
    ],
    correctAnswer: 3,
    explanation:
      'Consumer unit replacement is notifiable work as it involves work at the origin of the installation.',
    section: 'Notifiable Work',
    difficulty: 'basic',
    topic: 'Consumer Units',
    category: 'Building Regulations',
  },

  // ============================================================
  // SAFE ISOLATION (50 questions) - IDs 301-350
  // ============================================================

  // GS38 Procedure (20 questions)
  {
    id: 301,
    question: 'What is the correct sequence for safe isolation according to GS38?',
    options: [
      'Isolate, prove dead, secure, identify circuit, then re-test indicator',
      'Identify circuit, isolate, secure, test voltage indicator, prove dead, re-test indicator',
      'Prove dead, isolate, secure, identify circuit, then apply labels',
      'Identify circuit, prove dead, isolate, secure, then test the indicator',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 procedure: identify circuit, isolate, secure against re-energisation, test voltage indicator on known live source, prove circuit dead, re-test indicator on live source.',
    section: 'GS38',
    difficulty: 'intermediate',
    topic: 'Procedure',
    category: 'Safe Isolation',
  },
  {
    id: 302,
    question: 'Why must a voltage indicator be tested before and after proving dead?',
    options: [
      "To calibrate the indicator against the supply voltage",
      "To record the readings on the test certificate",
      "To confirm the tester is working correctly and hasn't failed during use",
      "To discharge any stored energy in the indicator",
    ],
    correctAnswer: 2,
    explanation:
      "Testing before proves it works, testing after confirms it didn't fail during the proving dead test - this validates the dead reading.",
    section: 'GS38',
    difficulty: 'basic',
    topic: 'Proving Unit',
    category: 'Safe Isolation',
  },
  {
    id: 303,
    question: 'What is a proving unit used for?',
    options: [
      'Measuring the earth fault loop impedance of a circuit',
      'Discharging capacitors before working on equipment',
      'Locating a hidden cable behind a wall',
      'Providing a known voltage to test that the voltage indicator works',
    ],
    correctAnswer: 3,
    explanation:
      'A proving unit provides a known voltage source to test that voltage indicators are functioning correctly before and after use.',
    section: 'GS38',
    difficulty: 'basic',
    topic: 'Proving Unit',
    category: 'Safe Isolation',
  },
  {
    id: 304,
    question: 'What should be done to prevent accidental re-energisation?',
    options: [
      'Lock off with personal lock and apply warning labels',
      'Switch off the main switch and leave it unattended',
      'Remove the relevant fuse and place it in a pocket',
      'Inform a colleague verbally before starting work',
    ],
    correctAnswer: 0,
    explanation:
      'Secure isolation using personal lock with unique key, apply warning labels, and retain the key until work is complete.',
    section: 'Lock-off',
    difficulty: 'basic',
    topic: 'Security',
    category: 'Safe Isolation',
  },
  {
    id: 305,
    question: 'Under GS38, what is the maximum permitted exposed metal probe tip length?',
    options: [
      '10mm',
      '4mm (2mm preferred)',
      '20mm',
      'No limit',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 specifies maximum 4mm exposed probe tip length, with 2mm being preferred to minimise arc flash risk.',
    section: 'GS38',
    difficulty: 'basic',
    topic: 'Test Equipment',
    category: 'Safe Isolation',
  },
  {
    id: 306,
    question: 'What features should test leads comply with according to GS38?',
    options: [
      'Bare probe tips of at least 10mm for good contact',
      'Coiled leads with crocodile clips at each end',
      'Finger barriers, fused, insulated probes, correct CAT rating',
      'Unfused leads to give the most accurate reading',
    ],
    correctAnswer: 2,
    explanation:
      'GS38 requires finger barriers or shrouded probes, fused leads, maximum 4mm exposed tip, and appropriate CAT rating.',
    section: 'GS38',
    difficulty: 'basic',
    topic: 'Test Equipment',
    category: 'Safe Isolation',
  },
  {
    id: 307,
    question: 'What CAT rating is typically required for testing at the origin of an installation?',
    options: [
      'CAT II',
      'No rating required',
      'CAT I',
      'CAT III or CAT IV',
    ],
    correctAnswer: 3,
    explanation:
      'Testing at origin requires CAT III (distribution level) or CAT IV (service entrance), depending on location.',
    section: 'GS38',
    difficulty: 'advanced',
    topic: 'CAT Ratings',
    category: 'Safe Isolation',
  },
  {
    id: 308,
    question: 'When isolating, which phases must be proven dead on a three-phase supply?',
    options: [
      'All three phases L1, L2, L3 and neutral',
      'Only the phase being worked on',
      'Any two of the three phases plus earth',
      'L1 and the neutral conductor at the origin',
    ],
    correctAnswer: 0,
    explanation:
      'All three phases and the neutral must be proven dead as any could be energised due to faults or backfeed.',
    section: 'Three Phase',
    difficulty: 'basic',
    topic: 'Three-Phase Isolation',
    category: 'Safe Isolation',
  },

  // Test Equipment (15 questions)
  {
    id: 309,
    question: 'Why are two-pole voltage testers preferred over single-pole neon testers?',
    options: [
      'They are cheaper to buy and easier to carry around a busy site',
      'They measure voltage reliably between two points, unlike a neon that can mislead',
      'They can also measure insulation resistance and continuity of the cpc',
      'They do not need to be proved on a known live source beforehand',
    ],
    correctAnswer: 1,
    explanation:
      'Two-pole testers measure voltage between two points (L-N, L-E), providing reliable detection unlike neon testers that can give false readings.',
    section: 'Test Equipment',
    difficulty: 'basic',
    topic: 'Voltage Testers',
    category: 'Safe Isolation',
  },
  {
    id: 310,
    question: 'What visual checks should be made on a voltage indicator before use?',
    options: [
      'Confirm the calibration certificate is within date only',
      'Check the battery level and display brightness only',
      'Check for damage to leads, probes, body; ensure probes are insulated',
      'Verify the CAT rating matches the supply frequency',
    ],
    correctAnswer: 2,
    explanation:
      'Check leads and probes for damage, correct connection, insulation intact, finger barriers present, no exposed conductors.',
    section: 'Test Equipment',
    difficulty: 'basic',
    topic: 'Pre-use Checks',
    category: 'Safe Isolation',
  },
  {
    id: 311,
    question: 'What is the maximum fuse rating for GS38 compliant test leads?',
    options: [
      '3A',
      'No fuse required',
      '13A',
      '500mA or less',
    ],
    correctAnswer: 3,
    explanation:
      'GS38 recommends fused leads with fuses rated at 500mA or less to limit energy in case of flashover.',
    section: 'Test Equipment',
    difficulty: 'advanced',
    topic: 'Fused Leads',
    category: 'Safe Isolation',
  },

  // Warning Notices (10 questions)
  {
    id: 312,
    question: 'What information should an isolation warning label include?',
    options: [
      'Name of person isolating, date/time, what is isolated, contact details',
      'The circuit rating, cable size, and protective device type',
      'The Zs value and disconnection time of the circuit',
      'The manufacturer and serial number of the equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Labels should identify who has isolated, date and time, what circuit/equipment, and how to contact them.',
    section: 'Warning Notices',
    difficulty: 'basic',
    topic: 'Label Content',
    category: 'Safe Isolation',
  },
  {
    id: 313,
    question: 'Where should danger/warning notices be placed during isolation?',
    options: [
      'At the property entrance and on the front door only',
      'At all points of isolation and points where work is being carried out',
      'Only at the main intake position of the installation',
      'On each piece of test equipment being used',
    ],
    correctAnswer: 1,
    explanation:
      'Notices should be at all isolation points and work locations to warn others and prevent accidental re-energisation.',
    section: 'Warning Notices',
    difficulty: 'basic',
    topic: 'Placement',
    category: 'Safe Isolation',
  },

  // Permit to Work (5 questions)
  {
    id: 314,
    question: 'When might a permit to work system be required for electrical work?',
    options: [
      'For any domestic socket-outlet addition on a ring final circuit',
      'Whenever a Minor Works Certificate is issued for the work',
      'For high-risk work, especially on HV systems or in industrial environments',
      'When working alone on a final circuit in an occupied building',
    ],
    correctAnswer: 2,
    explanation:
      'Permit to work systems are used for high-risk activities, including HV systems, complex isolations, or where multiple teams work.',
    section: 'Permits',
    difficulty: 'basic',
    topic: 'When Required',
    category: 'Safe Isolation',
  },
  {
    id: 315,
    question:
      'Who is responsible for removing the lock and warning notices after work is complete?',
    options: [
      'Any qualified electrician on site',
      'The site supervisor or foreman',
      'The first person to finish their task',
      'Only the person who applied them or authorised transfer',
    ],
    correctAnswer: 3,
    explanation:
      'Only the person who applied their personal lock should remove it, or formal handover procedures must be followed.',
    section: 'Lock-off',
    difficulty: 'basic',
    topic: 'Removal',
    category: 'Safe Isolation',
  },

  // ============================================================
  // FAULT FINDING (50 questions) - IDs 351-400
  // ============================================================

  // Methodology (15 questions)
  {
    id: 351,
    question: 'What is the first step in systematic fault finding?',
    options: [
      'Replace the most likely faulty component immediately',
      'Isolate and dismantle the affected equipment',
      'Carry out an insulation resistance test',
      'Gather information about the symptoms and history',
    ],
    correctAnswer: 3,
    explanation:
      'Start by gathering information: what happened, when, any changes made, symptoms observed, to understand the problem.',
    section: 'Methodology',
    difficulty: 'basic',
    topic: 'Six-Point Plan',
    category: 'Fault Finding',
  },
  {
    id: 352,
    question: 'What is the logical six-point fault finding approach?',
    options: [
      'Gather info, analyse, identify possible causes, test hypothesis, rectify, verify',
      'Isolate, prove dead, dismantle, replace, reassemble, energise',
      'Inspect, test, record, report, repair, re-test',
      'Identify, evaluate, control, record, review, communicate',
    ],
    correctAnswer: 0,
    explanation:
      'Six-point approach: gather information, analyse symptoms, identify probable causes, test to locate fault, rectify, verify operation.',
    section: 'Methodology',
    difficulty: 'advanced',
    topic: 'Six-Point Plan',
    category: 'Fault Finding',
  },
  {
    id: 353,
    question: "What is the 'half-split' method in fault finding?",
    options: [
      'Splitting the load equally across two circuits',
      'Testing at the midpoint to determine which half contains the fault',
      'Disconnecting half the circuits to reduce the test current',
      'Comparing readings from two identical installations',
    ],
    correctAnswer: 1,
    explanation:
      'Half-split: test at the midpoint of a circuit to determine which half contains the fault, then repeat in the faulty half.',
    section: 'Methodology',
    difficulty: 'basic',
    topic: 'Test Methods',
    category: 'Fault Finding',
  },
  {
    id: 354,
    question: 'Before starting electrical fault finding, what must be done first?',
    options: [
      'Order the replacement parts most likely to be needed',
      'Inform the customer of the expected cost of the repair',
      'Conduct a risk assessment and ensure safe isolation where appropriate',
      'Issue a Minor Works Certificate covering the repair',
    ],
    correctAnswer: 2,
    explanation:
      'Always assess risks, ensure appropriate isolation, and follow safe working procedures before fault finding.',
    section: 'Safety',
    difficulty: 'basic',
    topic: 'Safe Approach',
    category: 'Fault Finding',
  },

  // Common Faults (20 questions)
  {
    id: 355,
    question: 'An MCB trips immediately on reset. What type of fault does this indicate?',
    options: [
      'A gradual overload condition',
      'A high-resistance loose connection',
      'Normal inrush current at switch-on',
      'Short circuit (dead short)',
    ],
    correctAnswer: 3,
    explanation:
      'Immediate tripping indicates a short circuit (L-N or L-E), causing high fault current and magnetic trip operation.',
    section: 'Common Faults',
    difficulty: 'basic',
    topic: 'MCB Tripping',
    category: 'Fault Finding',
  },
  {
    id: 356,
    question: 'An MCB trips after a few minutes of operation. This suggests:',
    options: [
      'Overload condition',
      'Short circuit',
      'Earth fault',
      'Incorrect installation',
    ],
    correctAnswer: 0,
    explanation:
      'Delayed tripping (thermal operation) indicates overload - current exceeds rating but not enough for instant magnetic trip.',
    section: 'Common Faults',
    difficulty: 'intermediate',
    topic: 'MCB Tripping',
    category: 'Fault Finding',
  },
  {
    id: 357,
    question: 'An RCD keeps tripping. What should you check?',
    options: [
      'The breaking capacity of the protective device',
      'Earth leakage, N-E faults, moisture ingress, or faulty appliances',
      'The voltage drop across the final circuit',
      'The colour coding of the circuit conductors',
    ],
    correctAnswer: 1,
    explanation:
      'RCDs trip on current imbalance, typically caused by earth leakage, N-E cross connections, moisture, or faulty equipment.',
    section: 'Common Faults',
    difficulty: 'basic',
    topic: 'RCD Tripping',
    category: 'Fault Finding',
  },
  {
    id: 358,
    question: 'What causes a high resistance joint?',
    options: [
      'Over-tightened terminals crushing the conductor strands',
      'Using a conductor of too large a cross-sectional area',
      'Poor connections, oxidation, incorrect termination, or mechanical damage',
      'Excessive insulation resistance at the termination point',
    ],
    correctAnswer: 2,
    explanation:
      'High resistance joints result from loose connections, corrosion, incorrect termination, or damage, causing heat and potential fire risk.',
    section: 'Common Faults',
    difficulty: 'basic',
    topic: 'High Resistance',
    category: 'Fault Finding',
  },
  {
    id: 359,
    question: 'How can a high resistance joint be identified?',
    options: [
      'An insulation resistance reading of less than 1.0MΩ to earth',
      'A residual current that trips the RCD repeatedly on load',
      'A prospective fault current above the device breaking capacity',
      'Thermal imaging, smell of burning, discoloration, or voltage drop testing',
    ],
    correctAnswer: 3,
    explanation:
      'Signs include discoloration, smell, heat detected by thermal imaging, or voltage drop measurements across connections.',
    section: 'Common Faults',
    difficulty: 'intermediate',
    topic: 'High Resistance',
    category: 'Fault Finding',
  },
  {
    id: 360,
    question: 'What is a transient fault?',
    options: [
      'An intermittent fault that comes and goes',
      'A permanent short circuit between line and earth',
      'A fault that only appears under full load',
      'A fault caused solely by a damaged conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Transient faults are intermittent, appearing and disappearing, often temperature or vibration related, making them difficult to locate.',
    section: 'Fault Types',
    difficulty: 'intermediate',
    topic: 'Transient Faults',
    category: 'Fault Finding',
  },
  {
    id: 361,
    question: 'A lighting circuit has partial failure. What should be checked?',
    options: [
      'The earth fault loop impedance at the consumer unit',
      'Individual switches, connections, and lamp holders in the dead section',
      'The breaking capacity of the protective device',
      'The voltage drop across the whole installation',
    ],
    correctAnswer: 1,
    explanation:
      'Partial failure suggests a localised fault - check switches, connections, lamp holders in the non-working section.',
    section: 'Common Faults',
    difficulty: 'basic',
    topic: 'Lighting Faults',
    category: 'Fault Finding',
  },
  {
    id: 362,
    question: 'What can cause flickering lights?',
    options: [
      'An oversized circuit protective conductor in the final circuit',
      'Correctly rated conductors that are well terminated at both ends',
      'Loose connections, failing lamps, incompatible dimmer, or supply issues',
      'An RCD set to a higher residual operating current rating',
    ],
    correctAnswer: 2,
    explanation:
      'Flickering can indicate loose connections, failing lamp/driver, incompatible dimmer with LED lamps, or supply voltage fluctuations.',
    section: 'Common Faults',
    difficulty: 'basic',
    topic: 'Lighting Faults',
    category: 'Fault Finding',
  },

  // Test Instruments (10 questions)
  {
    id: 363,
    question: 'Which instrument would you use to trace a cable route?',
    options: [
      'Earth loop tester',
      'Insulation resistance tester',
      'RCD tester',
      'Cable locator/tracer',
    ],
    correctAnswer: 3,
    explanation:
      'Cable locators use signal transmission and detection to trace cable routes through walls and underground.',
    section: 'Instruments',
    difficulty: 'basic',
    topic: 'Cable Locators',
    category: 'Fault Finding',
  },
  {
    id: 364,
    question: 'What would you use to detect hot spots indicating high resistance joints?',
    options: [
      'Thermal imaging camera',
      'Multimeter',
      'Proving unit',
      'Socket tester',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal imaging cameras detect elevated temperatures at connection points, indicating high resistance joints.',
    section: 'Instruments',
    difficulty: 'basic',
    topic: 'Thermal Imaging',
    category: 'Fault Finding',
  },
  {
    id: 365,
    question: 'How can you test for a broken conductor in a cable?',
    options: [
      'An insulation resistance test between live conductors',
      'Continuity test along the conductor length',
      'A prospective fault current measurement',
      'An RCD trip-time test at 5×IΔn',
    ],
    correctAnswer: 1,
    explanation:
      'A continuity test will show infinite resistance (open circuit) where the conductor is broken.',
    section: 'Test Methods',
    difficulty: 'basic',
    topic: 'Continuity',
    category: 'Fault Finding',
  },

  // Documentation and Repair (5 questions)
  {
    id: 366,
    question: 'After rectifying a fault, what must be done?',
    options: [
      'Leave the circuit isolated until the next inspection',
      'Inform building control of the repair carried out',
      'Test to verify repair, document the fault and repair',
      'Replace the protective device as a precaution',
    ],
    correctAnswer: 2,
    explanation:
      'After repair: test to verify correct operation, document what was found and done, provide appropriate certification if required.',
    section: 'Documentation',
    difficulty: 'basic',
    topic: 'Post-Repair',
    category: 'Fault Finding',
  },
  {
    id: 367,
    question: 'What documentation should be provided after fault rectification?',
    options: [
      'A RIDDOR report submitted to the HSE',
      'A Building Regulations Compliance Certificate only',
      'A risk assessment and method statement only',
      'Minor Works Certificate or EIC as appropriate, plus fault report',
    ],
    correctAnswer: 3,
    explanation:
      'Appropriate certification (Minor Works or EIC) plus a fault report detailing symptoms, cause, and rectification work done.',
    section: 'Documentation',
    difficulty: 'basic',
    topic: 'Certificates',
    category: 'Fault Finding',
  },

  // Additional questions to reach 400
  {
    id: 368,
    question: 'What is the typical supply voltage tolerance in the UK?',
    options: [
      '+10%/-6% of 230V',
      '±5%',
      '±15%',
      'Exactly 230V always',
    ],
    correctAnswer: 0,
    explanation: 'UK supply is 230V +10%/-6%, giving acceptable range of 216.2V to 253V.',
    section: 'Supply',
    difficulty: 'intermediate',
    topic: 'Voltage',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 369,
    question: 'What is the purpose of a consumer unit?',
    options: [
      'To meter the energy used by the installation',
      'To distribute circuits and provide overcurrent and RCD protection',
      'To transform the supply voltage down to a safe level',
      'To bond all the extraneous-conductive-parts together',
    ],
    correctAnswer: 1,
    explanation:
      'A consumer unit is the main distribution board distributing circuits and housing protective devices for the installation.',
    section: 'Equipment',
    difficulty: 'basic',
    topic: 'Consumer Units',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 370,
    question: 'What does AMD stand for in relation to BS 7671?',
    options: [
      'Auto Metering Device',
      'Approved Modification',
      'Amendment',
      'Applied Maximum Demand',
    ],
    correctAnswer: 2,
    explanation: 'AMD refers to Amendments to BS 7671, which update the standard between editions.',
    section: 'Standards',
    difficulty: 'advanced',
    topic: 'Amendments',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 371,
    question:
      'What is the minimum IP rating for general electrical equipment in Zone 2 of a bathroom?',
    options: [
      'IPX0',
      'No requirement',
      'IPX7',
      'IPX4',
    ],
    correctAnswer: 3,
    explanation:
      'Zone 2 requires minimum IPX4 for fixed equipment (protection against splashing water).',
    section: 'Special Locations',
    difficulty: 'basic',
    topic: 'IP Ratings',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 372,
    question: 'What is the purpose of RCD protection?',
    options: [
      'To provide additional protection against electric shock by detecting earth leakage',
      'To protect the circuit cables against overload and short-circuit current',
      'To limit the voltage drop on long final circuits in large installations',
      'To bond exposed-conductive-parts back to the main earthing terminal',
    ],
    correctAnswer: 0,
    explanation:
      'RCDs detect current imbalance (earth leakage) and disconnect quickly, providing additional protection against electric shock.',
    section: 'Protection',
    difficulty: 'basic',
    topic: 'RCD Purpose',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 373,
    question: 'What must be verified before energising a new installation?',
    options: [
      'That the customer has paid the final invoice',
      'Completion of all inspection and testing, satisfactory results recorded',
      'That the supply has been notified to the distributor',
      'That a periodic inspection is booked within 12 months',
    ],
    correctAnswer: 1,
    explanation:
      'All inspection and testing must be complete with satisfactory results before energisation.',
    section: 'Verification',
    difficulty: 'basic',
    topic: 'Energisation',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 374,
    question: 'How should circuit identification labels be marked?',
    options: [
      'In pencil so they can be amended later',
      'Only on circuits supplying special locations',
      'Durable and legible marking identifying each circuit',
      'With the installer’s initials and the install date only',
    ],
    correctAnswer: 2,
    explanation:
      'Circuits must be durably and legibly marked to identify them at the distribution board.',
    section: 'Identification',
    difficulty: 'basic',
    topic: 'Labelling',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 375,
    question: 'What is the purpose of a functional test?',
    options: [
      'To measure the insulation resistance of each circuit',
      'To confirm the earth fault loop impedance is within limits',
      'To verify the cable current-carrying capacity',
      'To verify that controls, interlocks, and devices operate correctly',
    ],
    correctAnswer: 3,
    explanation:
      'Functional testing verifies that all controls, switches, interlocks, and devices operate as intended.',
    section: 'Testing',
    difficulty: 'basic',
    topic: 'Functional Tests',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 376,
    question: 'What is double insulation (Class II)?',
    options: [
      'Basic insulation plus supplementary insulation, no earth required',
      'Basic insulation with an earthed metal enclosure',
      'Two layers of basic insulation plus a protective earth',
      'A reduced low-voltage supply with no earth connection',
    ],
    correctAnswer: 0,
    explanation:
      'Class II equipment has both basic and supplementary insulation, requiring no protective earth connection.',
    section: 'Protection',
    difficulty: 'intermediate',
    topic: 'Class II',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 377,
    question: 'What is SELV?',
    options: [
      'Standard Extra Low Voltage',
      'Separated Extra-Low Voltage',
      'Special Electric Low Voltage',
      'Single Element Low Voltage',
    ],
    correctAnswer: 1,
    explanation:
      'SELV (Separated Extra-Low Voltage) is a system where live parts are isolated from earth and other systems.',
    section: 'Protection',
    difficulty: 'basic',
    topic: 'SELV',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 378,
    question: 'What voltage is considered extra-low voltage (ELV)?',
    options: [
      'Not exceeding 230V AC or 400V DC',
      'Not exceeding 110V AC or 230V DC',
      'Not exceeding 50V AC or 120V DC',
      'Not exceeding 25V AC or 60V DC',
    ],
    correctAnswer: 2,
    explanation:
      'Extra-low voltage does not exceed 50V AC rms or 120V ripple-free DC between conductors or to earth.',
    section: 'Definitions',
    difficulty: 'intermediate',
    topic: 'ELV',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 379,
    question: 'What is the purpose of a warning notice at the origin of installation?',
    options: [
      'To record the prospective fault current at the board',
      'To identify the installer for warranty purposes',
      'To display the maximum demand of the installation',
      'To warn of potential dangers and provide safety information',
    ],
    correctAnswer: 3,
    explanation:
      'Warning notices alert persons to potential dangers and provide safety information (e.g., earthing arrangement, RCD test reminder).',
    section: 'Notices',
    difficulty: 'basic',
    topic: 'Warning Notices',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 380,
    question:
      'What periodic inspection interval is typically recommended for domestic installations?',
    options: [
      'Every 10 years or change of occupancy',
      'Every 12 months without exception',
      'Every 5 years or change of occupancy',
      'Every 25 years for owner-occupied homes',
    ],
    correctAnswer: 0,
    explanation:
      'Domestic installations should be inspected every 10 years or at change of occupancy, whichever is sooner (IET Guidance Note 3).',
    section: 'Inspection',
    difficulty: 'advanced',
    topic: 'Periodic Inspection',
    category: 'BS7671 Inspection & Testing',
  },

  // Final questions 381-400
  {
    id: 381,
    question: 'What is the recommended minimum height for socket outlets in new domestic premises?',
    options: [
      '150mm from floor level (just above the skirting)',
      '450mm from floor level (accessibility guidance)',
      '900mm from floor level (standard worktop height)',
      '1200mm from floor level (upper accessible reach)',
    ],
    correctAnswer: 1,
    explanation:
      'Approved Document M recommends 450mm-1200mm above floor level for accessibility in new dwellings.',
    section: 'Accessibility',
    difficulty: 'basic',
    topic: 'Socket Heights',
    category: 'Building Regulations',
  },
  {
    id: 382,
    question: 'What must be installed in new domestic consumer units from January 2016?',
    options: [
      'A surge protection device on every circuit',
      'An arc fault detection device on every circuit',
      'Non-combustible enclosure (metal or fire-resistant)',
      'A 100mA time-delayed main RCD',
    ],
    correctAnswer: 2,
    explanation:
      'Amendment 3 (2015) required consumer units to have non-combustible enclosures to reduce fire risk.',
    section: 'Consumer Units',
    difficulty: 'intermediate',
    topic: 'Fire Safety',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 383,
    question: 'What is the purpose of supplementary bonding in bathrooms?',
    options: [
      'To provide a low-impedance return path for earth fault current',
      'To limit the voltage drop on the bathroom lighting circuit',
      'To reduce the disconnection time of the protective device',
      'To reduce potential differences between simultaneously accessible parts',
    ],
    correctAnswer: 3,
    explanation:
      'Supplementary bonding ensures minimal potential difference between exposed and extraneous-conductive-parts that can be touched simultaneously.',
    section: 'Bathrooms',
    difficulty: 'intermediate',
    topic: 'Supplementary Bonding',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 384,
    question: 'When can supplementary bonding be omitted in a bathroom?',
    options: [
      'When all circuits are RCD protected and main bonding is satisfactory',
      'When the bathroom has no metallic pipework at all',
      'When the installation is no more than ten years old',
      'When the bathroom is supplied by a dedicated circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Supplementary bonding may be omitted if all circuits comply with ADS, are RCD protected (30mA), and main bonding is present.',
    section: 'Bathrooms',
    difficulty: 'intermediate',
    topic: 'Omission',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 385,
    question: 'What is the typical maximum inspection interval for commercial premises?',
    options: [
      'Every 10 years or change of occupancy',
      'Typically 5 years depending on type and use',
      'Every 12 months without exception',
      'Every 25 years or change of tenancy',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial/industrial premises typically require inspection every 1-5 years depending on the type and use (IET Guidance Note 3).',
    section: 'Periodic Inspection',
    difficulty: 'intermediate',
    topic: 'Inspection Intervals',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 386,
    question: 'What information must be recorded on the Electrical Installation Certificate?',
    options: [
      'Only the name, address and scheme registration number of the installer',
      'The test results for each final circuit, on a separate schedule of results',
      'Description of installation, test results, schedule of circuits, design and installation details',
      'The earthing arrangement and the sizes of the main protective bonding conductors',
    ],
    correctAnswer: 2,
    explanation:
      'EIC must include full installation details, extent covered, declaration, schedule of inspections, test results, and circuit schedules.',
    section: 'Certification',
    difficulty: 'basic',
    topic: 'EIC Requirements',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 387,
    question: 'What does a C1 coding on an EICR indicate?',
    options: [
      'Potentially dangerous, urgent remedial action required',
      'Improvement recommended but not a danger',
      'Further investigation required without delay',
      'Danger present, immediate remedial action required',
    ],
    correctAnswer: 3,
    explanation: 'C1 = Danger present. Risk of injury. Immediate remedial action required.',
    section: 'EICR',
    difficulty: 'basic',
    topic: 'Classification Codes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 388,
    question: 'What does a C2 coding indicate?',
    options: [
      'Potentially dangerous, urgent remedial action required',
      'Danger present, immediate remedial action required',
      'Improvement recommended but not a danger',
      'Further investigation required without delay',
    ],
    correctAnswer: 0,
    explanation: 'C2 = Potentially dangerous. Urgent remedial action required.',
    section: 'EICR',
    difficulty: 'intermediate',
    topic: 'Classification Codes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 389,
    question: 'What does a C3 coding indicate?',
    options: [
      'Urgent action required',
      'Improvement recommended',
      'Danger present',
      'Potentially dangerous',
    ],
    correctAnswer: 1,
    explanation: 'C3 = Improvement recommended. Not a danger but improvement would enhance safety.',
    section: 'EICR',
    difficulty: 'intermediate',
    topic: 'Classification Codes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 390,
    question: 'What is FI on an EICR?',
    options: [
      'Fault Indicated on the circuit',
      'Final Inspection completed',
      'Further Investigation required',
      'Fully Isolated condition',
    ],
    correctAnswer: 2,
    explanation:
      'FI = Further Investigation required without delay. Used when testing could not be completed or further examination needed.',
    section: 'EICR',
    difficulty: 'basic',
    topic: 'Classification Codes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 391,
    question: 'What is the purpose of prospective fault current (PFC) testing?',
    options: [
      'To confirm the disconnection time meets Table 41.1',
      'To verify the insulation resistance of the circuit',
      'To check the polarity of the supply at the origin',
      'To verify protective devices have adequate breaking capacity',
    ],
    correctAnswer: 3,
    explanation:
      'PFC testing ensures protective devices can safely interrupt the maximum fault current available at that point.',
    section: 'Testing',
    difficulty: 'basic',
    topic: 'PFC',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 392,
    question: 'Where must PFC be measured?',
    options: [
      'At the origin and at the most remote point of the installation',
      'At the neutral bar within the consumer unit only',
      'At every accessory point on each final circuit',
      'At the main earthing terminal at the origin only',
    ],
    correctAnswer: 0,
    explanation:
      'PFC should be measured at the origin (highest value) and verified at the furthest point of the installation.',
    section: 'Testing',
    difficulty: 'intermediate',
    topic: 'PFC Location',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 393,
    question: 'What is a polarity test checking for?',
    options: [
      'That conductor resistances are within tabulated limits',
      'Correct connection of line, neutral, and earth conductors',
      'That insulation resistance exceeds 1.0MΩ',
      'That the RCD trips within the required time',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity testing confirms line, neutral, and earth conductors are correctly connected throughout the installation.',
    section: 'Testing',
    difficulty: 'basic',
    topic: 'Polarity',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 394,
    question: 'What is the test current for RCD testing at 1×IΔn?',
    options: [
      '15mA for a 30mA RCD',
      '150mA for a 30mA RCD',
      '30mA for a 30mA RCD',
      '300mA for a 30mA RCD',
    ],
    correctAnswer: 2,
    explanation:
      '1×IΔn test applies the rated residual operating current (e.g., 30mA for a 30mA RCD).',
    section: 'RCD Testing',
    difficulty: 'basic',
    topic: 'Test Currents',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 395,
    question: 'What test confirms no RCD nuisance tripping will occur from normal earth leakage?',
    options: [
      '5×IΔn test',
      '1×IΔn test',
      'Insulation resistance test',
      '½×IΔn (50%) no-trip test',
    ],
    correctAnswer: 3,
    explanation:
      'The ½×IΔn (50%) test confirms the RCD will not trip at half rated current, avoiding nuisance tripping from normal leakage.',
    section: 'RCD Testing',
    difficulty: 'intermediate',
    topic: 'No-Trip Test',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 396,
    question: 'What action is required if an RCD fails the 40ms test at 5×IΔn?',
    options: [
      "The RCD must be replaced as it doesn't provide additional protection",
      "No action, as the 40ms limit only applies to time-delayed Type S RCDs",
      "Retest at 1×IΔn only and record that single result as a pass",
      "Reduce the circuit load and the RCD will then pass the test",
    ],
    correctAnswer: 0,
    explanation:
      "Failure to trip within 40ms at 5×IΔn means the RCD doesn't provide the required additional protection and must be replaced.",
    section: 'RCD Testing',
    difficulty: 'intermediate',
    topic: 'RCD Failure',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 397,
    question: 'What is the colour code for a line conductor?',
    options: [
      'Blue',
      'Brown',
      'Green and yellow',
      'Black',
    ],
    correctAnswer: 1,
    explanation:
      'Line conductors are identified by brown colour in single-phase installations (BS 7671).',
    section: 'Identification',
    difficulty: 'basic',
    topic: 'Conductor Colours',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 398,
    question: 'What is the colour code for a neutral conductor?',
    options: [
      'Brown',
      'Green and yellow',
      'Blue',
      'Grey',
    ],
    correctAnswer: 2,
    explanation: 'Neutral conductors are identified by blue colour in single-phase installations.',
    section: 'Identification',
    difficulty: 'basic',
    topic: 'Conductor Colours',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 399,
    question: 'What information should be displayed on the consumer unit labelling?',
    options: [
      'The prospective fault current and the measured Ze value only',
      'The maximum demand and the rating of the main fuse only',
      'The make and model of every protective device fitted',
      'Installer details, inspection dates, and earthing/bonding information',
    ],
    correctAnswer: 3,
    explanation:
      'Consumer unit should show installer details, installation/inspection dates, and earthing system type.',
    section: 'Labelling',
    difficulty: 'basic',
    topic: 'Consumer Unit Labels',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 400,
    question: 'What principle governs the maximum temperature at a termination?',
    options: [
      'Temperature rise should not cause degradation of insulation or surrounding materials',
      'The termination may reach the conductor’s short-circuit limit of 160°C',
      'The termination temperature is unlimited if the cable is derated',
      'The termination must never exceed the ambient air temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Terminations must not exceed temperatures that would degrade conductor insulation or adjacent materials.',
    section: 'Terminations',
    difficulty: 'intermediate',
    topic: 'Temperature Limits',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 401,
    question: 'During initial verification you measure Zs at the furthest point of a 32 A Type B final circuit and read 1.30 Ω at ambient. The tabulated maximum is 1.37 Ω. What should you conclude?',
    options: [
      'It is borderline: apply the 0.8 correction, giving 1.10 Ω, so 1.30 Ω fails',
      'It fails, because the tabulated value must be halved for ambient testing',
      'It passes, since the measured value is below the tabulated maximum',
      'It passes, provided a 30 mA RCD also protects the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Tabulated maximum Zs values assume conductors at their operating temperature. Measuring cold gives an optimistically low reading, so compare against 0.8 x the tabulated figure — here 1.37 x 0.8 = 1.10 Ω. A cold reading of 1.30 Ω is above that and will exceed the limit once the cable warms under load.',
    section: 'Zs Verification',
    difficulty: 'advanced',
    topic: 'Earth Fault Loop Impedance',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 402,
    question: 'Which statement about the ring final circuit continuity test is correct?',
    options: [
      'R2 is the end-to-end resistance of the neutral conductor',
      'R2 is the resistance of the circuit protective conductor',
      'The line-to-neutral cross-connection produces the certified R1+R2',
      'The three end-to-end readings are added to give R1+R2',
    ],
    correctAnswer: 1,
    explanation:
      'R1 is the line conductor and R2 is the circuit protective conductor — calling the neutral R2 is the single most common slip in this topic. The neutral loop is rn. Step 2 cross-connects line to neutral and proves those legs; step 3 cross-connects line to CPC and that reading at each socket is the R1+R2 recorded for Zs.',
    section: 'Ring Final Circuits',
    difficulty: 'advanced',
    topic: 'Continuity',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 403,
    question: 'You are verifying an RCD on a circuit installed to BS 7671:2018+A4:2026. Which test satisfies the Regulations?',
    options: [
      '½x, 1x and 5x IΔn on both half-cycles, recording the worst case',
      '5x IΔn on both half-cycles, which must clear within 40 ms',
      'An alternating current test at IΔn, whatever the RCD type',
      'The integral test button, provided it is recorded on the certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Amendment 4 deleted Table 3A of Appendix 3. Effectiveness is deemed verified by an alternating current test at the rated residual operating current, regardless of whether the device is Type AC, A, F or B — a general non-delay RCD must operate within 300 ms. The ½x and 5x tests remain useful diagnostics but are no longer required.',
    section: 'RCD Verification',
    difficulty: 'advanced',
    topic: 'RCD Testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 404,
    question: 'Insulation resistance is measured on a SELV circuit. What test voltage and minimum value apply?',
    options: [
      '500 V DC and 1.0 MΩ',
      '1000 V DC and 1.0 MΩ',
      '250 V DC and 1.0 MΩ',
      '250 V DC and 0.5 MΩ',
    ],
    correctAnswer: 3,
    explanation:
      'Table 64 gives 250 V DC with a 0.5 MΩ minimum for SELV and PELV, 500 V DC with 1.0 MΩ for circuits up to and including 500 V, and 1000 V DC with 1.0 MΩ above 500 V. Applying 500 V to a SELV circuit risks damaging connected equipment.',
    section: 'Insulation Resistance',
    difficulty: 'advanced',
    topic: 'Insulation Resistance',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 405,
    question: 'A 20 A radial supplies only fixed equipment on a TN-C-S system at 230 V. What maximum disconnection time applies?',
    options: [
      '0.4 s',
      '5 s',
      '1 s',
      '0.2 s',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 411.3.1.2 brings two categories into Table 41.1: final circuits up to 63 A including socket-outlets, and final circuits up to 32 A supplying only fixed connected equipment. A 20 A fixed-load radial is in the second group, so 0.4 s applies on TN at 230 V. The 5 s figure is for distribution circuits — assuming fixed equipment always means 5 s is a common and serious error.',
    section: 'Disconnection Times',
    difficulty: 'advanced',
    topic: 'ADS',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 406,
    question: 'Before starting work you prove a circuit dead. What does GS38 require of the voltage indicator?',
    options: [
      'It must be a multimeter set to the highest AC range available',
      'It must be a two-pole device with fused leads and limited exposed tip length',
      'It must be a non-contact voltage detector with an audible alarm',
      'It must be any indicator that has been calibrated within twelve months',
    ],
    correctAnswer: 1,
    explanation:
      'HSE Guidance Note GS38 calls for a dedicated two-pole voltage indicator with fused leads, limited exposed metal at the probe tips and adequate insulation. Multimeters and non-contact detectors are not acceptable for proving dead — a multimeter can be left on the wrong range and a non-contact detector can fail to indicate without warning.',
    section: 'Safe Isolation',
    difficulty: 'advanced',
    topic: 'GS38',
    category: 'Safe Isolation',
  },
  {
    id: 407,
    question: 'Which regulation requires that protective equipment selection accounts for unidirectional or bidirectional devices?',
    options: [
      'Regulation 411.3.3',
      'Regulation 443.4.1',
      'Regulation 530.3.201',
      'Regulation 421.1.7',
    ],
    correctAnswer: 2,
    explanation:
      '530.3.201 requires selection and erection of protective equipment to take account of the appropriate use of a unidirectional or bidirectional device — a mandatory consideration where a battery, PV inverter or similar source can export. Regulation 551.7.1(c) additionally requires a suitable protective device where energy flow is bidirectional and refers back to 530.3.201.',
    section: 'Bidirectional Devices',
    difficulty: 'advanced',
    topic: 'Protective Devices',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 408,
    question: 'An EICR observation records a plastic consumer unit in a domestic property under the stairs. Which is the correct position?',
    options: [
      'It is a C1, as combustible enclosures are prohibited outright',
      'It requires no code, as the requirement is not retrospective',
      'It is automatically a C2 because the location is an escape route',
      'It is a C2 or C3 depending on the circumstances, judged on the installation',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 421.1.201 requires consumer units in domestic premises to comply with BS EN 61439-3 and applies to new work rather than retrospectively. An existing plastic unit is coded on the actual risk — its condition, location and whether it presents a fire hazard — so it can be C2 or C3. Applying a fixed code without inspecting the circumstances is the error.',
    section: 'EICR Coding',
    difficulty: 'advanced',
    topic: 'Observation Codes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 409,
    question: 'What does Regulation 421.1.7 state regarding AFDDs?',
    options: [
      'It recommends them in AC final circuits of a fixed installation',
      'They shall be fitted to all AC final circuits in domestic premises',
      'They shall be fitted to socket-outlet circuits in higher-risk residential buildings',
      'They shall be fitted wherever cables are concealed at less than 50 mm depth',
    ],
    correctAnswer: 0,
    explanation:
      'The wording recommends AFDDs to mitigate the risk of fire in AC final circuits of a fixed installation. It is advisory rather than a \'shall\', and it lists no premises types — the frequently quoted list of higher-risk residential buildings, HMOs, student accommodation and care homes is not in the regulation.',
    section: 'A4:2026 Changes',
    difficulty: 'advanced',
    topic: 'AFDDs',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 410,
    question: 'A circuit supplying an electric underfloor heating unit requires additional protection. What applies?',
    options: [
      'A 100 mA RCD, with time-delayed types permitted for discrimination',
      'A 30 mA RCD, with time-delayed types expressly prohibited',
      'A 30 mA RCD only where the heating is in a room containing a bath',
      'Supplementary bonding of the heating element instead of an RCD',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 753.415.1 requires additional protection by RCD for circuits supplying heating units and expressly prohibits time-delayed types on those circuits. Regulation 701.415.2 is a separate requirement covering supplementary protective equipotential bonding in a room containing a bath or shower, and the two are frequently confused.',
    section: 'Special Locations',
    difficulty: 'advanced',
    topic: 'Heating',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 411,
    question: 'You find a Type AC RCD protecting a circuit that supplies a variable-speed drive. What is the correct assessment?',
    options: [
      'Acceptable, as Type AC responds to all residual current waveforms',
      'Acceptable provided the drive is rated below 3 kW',
      'Not acceptable — Reg 531.3.3 restricts Type AC to loads with no DC components',
      'Not acceptable — Type AC devices were withdrawn by Amendment 4',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 531.3.3 restricts Type AC to serving fixed equipment where the load current is known to contain no DC components. A variable-speed drive produces DC residual components that can blind a Type AC device, so Type A or higher is required. Type AC has not been withdrawn; it is restricted in application.',
    section: 'RCD Selection',
    difficulty: 'advanced',
    topic: 'RCD Types',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 412,
    question: 'Which of these correctly describes the voltage drop limits for an installation supplied from the public LV network?',
    options: [
      '5% for lighting and 8% for other uses',
      '5% for lighting and 3% for other uses',
      '4% for both lighting and other uses',
      '3% for lighting and 5% for other uses',
    ],
    correctAnswer: 3,
    explanation:
      'For low voltage installations supplied directly from a public distribution system the recommended maxima are 3% for lighting and 5% for other uses, measured between the origin of the installation and the load point. Quoting 5% for lighting is a common error — that figure belongs to power circuits.',
    section: 'Design Verification',
    difficulty: 'advanced',
    topic: 'Voltage Drop',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 413,
    question: 'A 32 A Type B RCBO protects a ring final circuit. You measure Zs at 1.05 Ω cold. The tabulated maximum is 1.37 Ω. What is the correct conclusion?',
    options: [
      'Passes — 1.05 Ω is under the 1.10 Ω corrected limit',
      'Fails — the RCBO rating must be reduced to 20 A',
      'Fails — ring circuits require Zs below 0.80 Ω',
      'Passes — RCBO protection removes the Zs requirement',
    ],
    correctAnswer: 0,
    explanation:
      'Compare a cold reading against 0.8 x the tabulated value: 1.37 x 0.8 = 1.10 Ω. At 1.05 Ω the circuit passes with little margin. RCD protection does not remove the Zs requirement — the overcurrent element still has to clear a fault within the disconnection time.',
    section: 'Zs Verification',
    difficulty: 'advanced',
    topic: 'Earth Fault Loop Impedance',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 414,
    question: 'Which sequence correctly orders the dead tests during initial verification?',
    options: [
      'Insulation resistance, continuity, polarity, earth electrode resistance',
      'Continuity, insulation resistance, polarity, earth electrode resistance',
      'Polarity, continuity, insulation resistance, earth electrode resistance',
      'Continuity, polarity, insulation resistance, earth electrode resistance',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity of protective conductors comes first because every later test relies on a proven earth path. Insulation resistance follows, then polarity, then earth electrode resistance on TT systems. Testing insulation before continuity means trusting an earth path you have not verified.',
    section: 'Test Sequence',
    difficulty: 'advanced',
    topic: 'Sequence',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 415,
    question: 'During insulation resistance testing on a lighting circuit you read 0.6 MΩ across the whole circuit. What should you do?',
    options: [
      'Accept it, as 0.5 MΩ is the minimum for lighting circuits',
      'Accept it if the circuit is protected by a 30 mA RCD',
      'Reject it and subdivide the circuit to locate the low reading',
      'Re-test at 250 V DC, which will give a higher reading',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum for a 230 V circuit is 1.0 MΩ at 500 V DC. A reading of 0.6 MΩ fails and must be investigated — commonly by splitting the circuit to find whether one section or an item of connected equipment is responsible. Dropping the test voltage to flatter the result is not acceptable.',
    section: 'Insulation Resistance',
    difficulty: 'advanced',
    topic: 'Insulation Resistance',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 416,
    question: 'What is the purpose of measuring Ze at the origin with the main earthing conductor disconnected?',
    options: [
      'To include any parallel paths through extraneous-conductive-parts',
      'To verify the supply cut-out fuse rating is adequate',
      'To confirm the main bonding conductors are correctly sized',
      'To exclude parallel paths so the true external impedance is measured',
    ],
    correctAnswer: 3,
    explanation:
      'Ze is the external earth fault loop impedance. Leaving the main earthing conductor connected allows parallel paths through gas and water bonding to lower the reading, flattering the result. Disconnecting it — with the installation safely isolated — gives the true external value for adding to R1+R2.',
    section: 'Ze Measurement',
    difficulty: 'advanced',
    topic: 'Earth Fault Loop Impedance',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 417,
    question: 'A TT installation has a measured earth electrode resistance of 180 Ω with a 30 mA RCD. What is the position?',
    options: [
      'Acceptable — the stability of the electrode also needs consideration',
      'Unacceptable — TT electrodes must be below 20 Ω in all cases',
      'Unacceptable — a 100 mA RCD is required above 100 Ω',
      'Acceptable only if supplementary bonding is installed throughout',
    ],
    correctAnswer: 0,
    explanation:
      'For a 30 mA RCD the touch voltage limit gives a maximum around 1667 Ω, so 180 Ω is comfortably within it. The practical concern is stability: an electrode reading that varies with ground conditions may not stay reliable, which is why a much lower value is normally sought. There is no blanket 20 Ω requirement.',
    section: 'TT Systems',
    difficulty: 'advanced',
    topic: 'Earth Electrode',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 418,
    question: 'Which of these is the correct reason for carrying out a polarity test?',
    options: [
      'To confirm the phase rotation is correct at three-phase outlets',
      'To confirm single-pole devices are in the line conductor only',
      'To confirm the neutral is at the same potential as earth',
      'To confirm the RCD will operate on both half-cycles',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity verification confirms that single-pole switching and protective devices are in the line conductor, that centre-contact lampholders have the line to the centre contact, and that socket-outlets are correctly wired. Reg 132.14.1 requires single-pole devices in the line conductor only.',
    section: 'Polarity',
    difficulty: 'advanced',
    topic: 'Polarity',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 419,
    question: 'You need to prove a circuit dead. What is the correct sequence?',
    options: [
      'Test the circuit twice, using two separate voltage indicators',
      'Test the circuit, then confirm the indicator works on a known live supply',
      'Test the indicator on a proving unit, test the circuit, re-test on the proving unit',
      'Isolate, lock off, then test the circuit with a multimeter',
    ],
    correctAnswer: 2,
    explanation:
      'Prove the indicator works on a known source such as a proving unit, test the circuit at every combination of conductors, then prove the indicator again afterwards. The final proving step is what catches an indicator that failed during the test and gave a false dead reading.',
    section: 'Safe Isolation',
    difficulty: 'advanced',
    topic: 'Proving Dead',
    category: 'Safe Isolation',
  },
  {
    id: 420,
    question: 'Under the Electricity at Work Regulations 1989, when may live working be undertaken?',
    options: [
      'Whenever the operative holds a valid competency card and is accompanied by a second person',
      'Where the work will take less than fifteen minutes to complete and the customer agrees',
      'On any circuit operating at or below 230V single-phase, provided insulating gloves are worn',
      'Where it is unreasonable to work dead, it is reasonable to work live, and suitable precautions are taken',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 14 sets three conditions that must all be met: it is unreasonable in all the circumstances for the conductor to be dead, it is reasonable in all the circumstances to work on or near it live, and suitable precautions are taken. Voltage level and time taken are not the tests.',
    section: 'Live Working',
    difficulty: 'advanced',
    topic: 'EAWR',
    category: 'Health & Safety',
  },
  {
    id: 421,
    question: 'A cable is installed in a wall at a depth of 40 mm and is not in a prescribed zone. What is required?',
    options: [
      '30 mA RCD protection, or mechanical protection, or an earthed metallic covering',
      'Nothing further, as the depth exceeds 25 mm',
      '100 mA RCD protection and a warning notice at the consumer unit',
      'The cable must be re-routed into a prescribed zone in all cases',
    ],
    correctAnswer: 0,
    explanation:
      'For cables concealed at less than 50 mm outside a prescribed zone, Section 522.6 requires one of the listed protective measures — 30 mA RCD additional protection, mechanical protection against penetration, or an earthed metallic covering. RCD protection is the usual choice but it is not the only one.',
    section: 'Cables in Walls',
    difficulty: 'advanced',
    topic: 'Concealed Cables',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 422,
    question: 'Which statement about a Type S RCD is correct?',
    options: [
      'It must operate faster than a general type to achieve discrimination',
      'It has both a minimum and a maximum operating time',
      'It is only permitted on three-phase distribution circuits',
      'It provides additional protection for socket-outlets up to 32 A',
    ],
    correctAnswer: 1,
    explanation:
      'A Type S is time-delayed to allow a downstream general-type device to clear first. It has a minimum as well as a maximum: operating too quickly means discrimination is lost, which is a failure just as surely as operating too slowly. It is not suitable for additional protection, which requires a non-delayed 30 mA device.',
    section: 'RCD Selection',
    difficulty: 'advanced',
    topic: 'RCD Types',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 423,
    question: 'What does the adiabatic equation determine?',
    options: [
      'The maximum permitted length of a circuit for voltage drop',
      'The maximum Zs for a given protective device',
      'The minimum cross-sectional area of a protective conductor',
      'The current-carrying capacity of a cable in a given method',
    ],
    correctAnswer: 2,
    explanation:
      'The adiabatic equation, S = sqrt(I squared t) / k, gives the minimum csa a protective conductor needs so it is not damaged by the fault current flowing for the disconnection time. Table 54.7 offers a simplified alternative that avoids the calculation but often yields a larger conductor.',
    section: 'Adiabatic',
    difficulty: 'advanced',
    topic: 'CPC Sizing',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 424,
    question: 'A circuit shows correct continuity and insulation resistance but the RCD trips as soon as it is energised. What is the most likely cause?',
    options: [
      'A short circuit between line and neutral, which an insulation resistance test would not reveal if those two conductors were linked',
      'The RCD is undersized for the connected load, so normal load current alone exceeds its residual operating current',
      'An open circuit protective conductor, which a continuity test taken only at the origin of the circuit would not pick up on a radial',
      'A neutral-to-earth fault, which insulation resistance testing between live conductors and earth can miss if the neutral was linked',
    ],
    correctAnswer: 3,
    explanation:
      'Insulation resistance is commonly tested with line and neutral linked together against earth, which will detect a neutral-earth fault. Where the test was done line-to-earth only, or the neutral was disconnected at the time, a neutral-earth fault can pass unnoticed and then trip the RCD the moment the circuit is loaded.',
    section: 'Fault Finding',
    difficulty: 'advanced',
    topic: 'Diagnosis',
    category: 'Fault Finding',
  },
  {
    id: 425,
    question: 'What is the main risk addressed by prohibiting a PME earthing facility at an outdoor EV charging point?',
    options: [
      'A broken PEN conductor raising exposed metalwork above true earth potential',
      'Corrosion of the earth electrode in wet ground',
      'Excessive voltage drop on the charging circuit',
      'Harmonic distortion from the vehicle\'s on-board charger',
    ],
    correctAnswer: 0,
    explanation:
      'An open PEN conductor allows the installation\'s earthed metalwork — including the vehicle body via the charging cable — to rise towards line potential relative to true earth. Someone standing on the ground touching the vehicle is then across that difference. This is why 722.411.4.1 restricts PME for charge points used outdoors unless an alternative in (b) to (e) is applied.',
    section: 'EV Charging',
    difficulty: 'advanced',
    topic: 'PME',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 426,
    question: 'Which of these correctly describes the requirement for a consumer unit in a domestic property?',
    options: [
      'It must be manufactured from metal in every case, without any exception',
      'It must comply with BS EN 61439-3, which in practice means a non-combustible enclosure',
      'It must be installed with its main switch at least 1.4m above floor level',
      'It must be fitted with a double-pole main switch rated at not less than 100A',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 421.1.201 requires consumer units and similar switchgear assemblies in domestic premises to comply with BS EN 61439-3 and have a non-combustible enclosure or be housed in one. This came in with Amendment 3 to BS 7671:2008, effective January 2016 — not with Amendment 4.',
    section: 'Consumer Units',
    difficulty: 'advanced',
    topic: 'Enclosures',
    category: 'Building Regulations',
  },
  {
    id: 427,
    question: 'Under Part P of the Building Regulations in England, which work is notifiable?',
    options: [
      'Replacing a damaged socket-outlet on an existing ring final circuit in a kitchen',
      'Any electrical work carried out in a dwelling, however minor the alteration may be',
      'Installing a new circuit, or any work in a room containing a bath or shower involving a new circuit',
      'Replacing an existing consumer unit, but only where the earthing arrangement is TT',
    ],
    correctAnswer: 2,
    explanation:
      'Notifiable work centres on new circuits and consumer unit replacement, plus certain work in special locations. Like-for-like replacement of an accessory on an existing circuit is maintenance and is not notifiable, though it must still comply with BS 7671.',
    section: 'Part P',
    difficulty: 'advanced',
    topic: 'Notification',
    category: 'Building Regulations',
  },
  {
    id: 428,
    question: 'What does a ramp test on an RCD determine?',
    options: [
      'The trip time at the rated residual operating current',
      'The device\'s ability to withstand a short-circuit',
      'Whether the device operates on both half-cycles',
      'The actual residual current at which the device operates',
    ],
    correctAnswer: 3,
    explanation:
      'A ramp test raises the residual current gradually from zero and reports the current at which the RCD actually operates — a 30 mA device might let go at 22 mA. It complements the timed test at IΔn and is useful when investigating nuisance tripping, though it has never been part of the required verification.',
    section: 'RCD Testing',
    difficulty: 'advanced',
    topic: 'RCD Testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 429,
    question: 'Which document records the results of an alteration to a single existing circuit with no new circuit added?',
    options: [
      'Minor Electrical Installation Works Certificate',
      'Electrical Installation Certificate',
      'Electrical Installation Condition Report',
      'Schedule of Test Results only',
    ],
    correctAnswer: 0,
    explanation:
      'A Minor Works certificate covers additions and alterations to an existing circuit that do not extend to a new circuit. Introducing a new circuit, or replacing a consumer unit, requires an EIC. An EICR is for assessing the condition of an existing installation, not for certifying new work.',
    section: 'Certification',
    difficulty: 'advanced',
    topic: 'Certificates',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 430,
    question: 'A three-phase motor circuit is being verified. Why is phase sequence checked?',
    options: [
      'To confirm the supply voltage is within tolerance',
      'To confirm the motor will rotate in the intended direction',
      'To confirm the neutral is correctly sized for harmonics',
      'To confirm the overload setting matches the full load current',
    ],
    correctAnswer: 1,
    explanation:
      'Incorrect phase sequence reverses the direction of rotation of a three-phase induction motor, which can damage driven plant such as pumps and compressors. Regulation 643 requires phase sequence to be verified at all relevant points on polyphase circuits.',
    section: 'Phase Sequence',
    difficulty: 'advanced',
    topic: 'Functional Testing',
    category: 'BS7671 Inspection & Testing',
  },

  // ============================================================
  // A4:2026 ADVANCED SET - IDs 431-440
  // Every fact below verified against bs7671_facets (2018+A4:2026)
  // before authoring. Targets the thin advanced pool: the bank had
  // only 29 genuinely advanced questions against measured wrong-rates.
  // ============================================================
  {
    id: 431,
    question:
      'Under BS 7671:2018+A4:2026, what is the status of arc fault detection devices (AFDDs) in AC final circuits?',
    options: [
      'Mandatory on all final circuits rated 32 A or less in domestic premises under Reg 421.1.7',
      'Recommended by Reg 421.1.7 to mitigate fire risk from arc fault currents, but not mandated',
      'Mandatory only where the installation includes a stationary secondary battery system',
      'Withdrawn by Amendment 4 and replaced by an equivalent RCBO requirement in Chapter 42',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 421.1.7 was introduced by A4:2026 and uses the word "recommending". It is advisory, not mandatory - it does not use "shall". Its stated purpose is mitigating fire risk in AC final circuits due to arc fault currents.',
    section: 'Protection against fire',
    difficulty: 'advanced',
    topic: 'AFDD status under A4:2026',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 432,
    question:
      'Regulation 421.1.7 recommends AFDDs specifically for which circuits of a fixed installation?',
    options: [
      'All final circuits, both AC and DC, in the installation',
      'DC final circuits, where arcs do not self-extinguish',
      'AC final circuits of a fixed installation',
      'Distribution circuits feeding sub-distribution boards',
    ],
    correctAnswer: 2,
    explanation:
      'The regulation limits its recommendation to AC final circuits of a fixed installation. The scope wording matters: it is not extended to DC circuits or to distribution circuits.',
    section: 'Protection against fire',
    difficulty: 'advanced',
    topic: 'Scope of Reg 421.1.7',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 433,
    question:
      'A pluggable UPS conforming to its product safety standard is installed in an office. Does Chapter 57 of BS 7671:2018+A4:2026 apply to its battery?',
    options: [
      'Yes - Chapter 57 applies to every stationary secondary battery regardless of the enclosure',
      'Yes, but only the ventilation and disconnection requirements of Chapter 57 are applicable',
      'No - Chapter 57 excludes batteries within systems conforming to appropriate product standards',
      'No, because a UPS is classed as a safety service and falls entirely outside Part 5',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 57 is new in A4:2026 and covers stationary secondary battery installations. It expressly does not apply where the battery sits within a system such as a pluggable UPS, fire or emergency lighting, or a central safety power supply conforming to the appropriate standards.',
    section: 'Stationary secondary batteries',
    difficulty: 'advanced',
    topic: 'Chapter 57 exclusions',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 434,
    question:
      'What did Amendment 4:2026 introduce as Chapter 57 of BS 7671?',
    options: [
      'Requirements for stationary secondary battery installations used for storage and supply',
      'Requirements for prosumer low voltage installations and their bidirectional metering',
      'Requirements for electric vehicle charging installations, relocated from Section 722',
      'Requirements for arc fault detection devices and their coordination with RCBOs',
    ],
    correctAnswer: 0,
    explanation:
      'A4:2026 introduced a new Chapter 57 in Part 5 dealing with stationary secondary battery installations whose designed purpose is the storage and supply of electrical installations.',
    section: 'Stationary secondary batteries',
    difficulty: 'advanced',
    topic: 'New Chapter 57 in A4:2026',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 435,
    question:
      'In a commercial premises, when may RCD protection be omitted from a 32 A socket-outlet under BS 7671:2018+A4:2026?',
    options: [
      'Where the socket is under the supervision of a skilled person and labelled accordingly',
      'Where a documented risk assessment determines that RCD protection is not necessary',
      'Where the circuit is supplied through a transformer providing simple separation',
      'Never - the revised Reg 411.3.3 permits no exception for socket-outlets rated 32 A or less',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 revised Reg 411.3.3. RCD protection applies to socket-outlets rated 32 A or less unless an express exception is met. The exception permits omission only where, other than for a dwelling, a documented risk assessment determines RCD protection is not necessary.',
    section: 'Additional protection',
    difficulty: 'advanced',
    topic: 'Reg 411.3.3 exception under A4:2026',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 436,
    question:
      'Under the revised Reg 411.3.3, how are socket-outlets with a rated current above 32 A treated?',
    options: [
      'They fall outside the scope of Reg 411.3.3 and must be considered separately',
      'They require additional protection by a 100 mA RCD rather than a 30 mA device',
      'They are covered by Reg 411.3.3 in premises other than dwellings',
      'They require additional protection where used by ordinary persons',
    ],
    correctAnswer: 0,
    explanation:
      'The revised regulation applies specifically to socket-outlets with a rated current not exceeding 32 A. Sockets rated above 32 A are outside the scope described in this revision and have to be considered separately.',
    section: 'Additional protection',
    difficulty: 'advanced',
    topic: 'Reg 411.3.3 scope limit',
    category: 'BS7671 Fundamentals',
  },
  {
    id: 437,
    question:
      'A 30 mA general-purpose RCD is being verified on the AM2 rig. What is the required test under BS 7671:2018+A4:2026?',
    options: [
      'A test at 1x IdN and a further test at 5x IdN, recording the shorter of the two trip times',
      'A no-trip test at half IdN followed by a test at 5x IdN requiring operation within 40 ms',
      'A single AC test at 1x IdN requiring operation within 300 ms, plus the integral test button',
      'Tests at half, one and five times IdN, with the results compared against Appendix 3 Table 3A',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 deleted Table 3A from Appendix 3, removing the 5x IdN row entirely. Verification is a single AC test at 1x IdN - a general-purpose non-delay RCD must operate within 300 ms - together with the manual test button. A half-IdN check some instruments run is pre-test confirmation, not part of the recorded verification.',
    section: 'RCD testing',
    difficulty: 'advanced',
    topic: 'RCD verification after Table 3A deletion',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 438,
    question:
      'Where does BS 7671 require cables to be adequately supported against premature collapse in a fire?',
    options: [
      'Along designated escape routes and within protected stairwells',
      'Where the building has more than three storeys above ground level',
      'Throughout the electrical installation, wherever cables are present',
      'Where the cables supply a safety service or fire-fighting circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 521.10.202 requires cables to be adequately supported so as to prevent premature collapse in the event of a fire, and it applies throughout the installation - it is not limited to escape routes.',
    section: 'Wiring systems',
    difficulty: 'advanced',
    topic: 'Reg 521.10.202 scope',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 439,
    question:
      'Which standard do graphical symbols used on installation diagrams, charts and schedules comply with?',
    options: [
      'BS EN 60617, which remains the current published standard for electrical symbols',
      'BS EN ISO 7010, which specifies graphical symbols for use on all electrical drawings',
      'BS 8888, which governs technical product documentation and drawing conventions',
      'IEC 60617, held as a database rather than as a conventional printed standard',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 514.9.1 requires symbols used in diagrams, charts, tables or schedules to comply with IEC 60617. BS EN 60617 was withdrawn - citing it is a common error. BS EN ISO 7010 covers safety signs, not circuit symbols.',
    section: 'Identification and notices',
    difficulty: 'advanced',
    topic: 'IEC 60617 vs withdrawn BS EN 60617',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 440,
    question:
      'Equipment is to be worked on for mechanical maintenance. What does Regulation 464.2 require?',
    options: [
      'A permit to work issued by an authorised person before any guarding is removed',
      'Suitable means to prevent the equipment being inadvertently or unintentionally reactivated',
      'Proving dead with an approved voltage indicator immediately before work commences',
      'A lock-off device fitted by every person working on the equipment without exception',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 464.2 requires suitable means to prevent electrically powered equipment from being inadvertently or unintentionally reactivated during mechanical maintenance. Verified means include lock-off devices, removable fuses with lockable carriers, padlocking isolators and withdrawal of removable control keys.',
    section: 'Isolation and switching',
    difficulty: 'advanced',
    topic: 'Reg 464.2 mechanical maintenance',
    category: 'Safe Isolation',
  },

  // ============================================================
  // AM2 PRACTICAL DEPTH SET - IDs 441-480
  // Safe isolation, GS38, test sequence, fault diagnosis, Section E
  // ============================================================
  {
    id: 441,
    question:
      'Regulation 643.3 was redrafted in BS 7671:2018+A4:2026. Where connected equipment is likely to influence the insulation resistance test or be damaged by it, what does the redraft clarify?',
    options: [
      'The equipment must be disconnected and the circuit tested at 500 V DC',
      'The insulation resistance test may be omitted and recorded as a limitation',
      'A 1000 V DC test is applied with all vulnerable equipment left in place',
      'A 250 V DC test carried out after the equipment is connected may be used',
    ],
    correctAnswer: 3,
    explanation:
      'The A4:2026 redraft of Regulation 643.3 clarifies that where connected equipment would influence the verification or be damaged by the normal test voltage, a 250 V DC insulation resistance test following connection of the equipment may be used. The method and the reason for it should be recorded on the schedule of test results.',
    section: 'Insulation resistance',
    difficulty: 'advanced',
    topic: 'Reg 643.3 redraft 250 V DC test',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 442,
    question: 'What does Guidance Note 3 say about test leads complying with HSE GS38?',
    options: [
      'They must be replaced after every twelve months in service',
      'They are suitable only for dead testing at extra-low voltage',
      'They are adequate for earth fault loop impedance testing',
      'They need a separate fuse fitted at the instrument terminal',
    ],
    correctAnswer: 2,
    explanation:
      'Guidance Note 3 states that leads complying with HSE GS38 should be adequate for loop impedance testing, so GS38 compliance is the acceptance criterion for the leads. GS38 itself sets out the construction and rating requirements, so it is the document to consult for lead specification.',
    section: 'Test equipment',
    difficulty: 'intermediate',
    topic: 'GS38 leads for loop testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 443,
    question:
      'Guidance Note 3 sets out the sequence of tests for initial verification. What does it require about that sequence?',
    options: [
      'The tests in Regulations 643.2 to 643.6 are done in order before energising',
      'The tests may be carried out in any order provided all are recorded',
      'The tests are carried out in order once the installation has been energised',
      'The tests follow the order given in the instrument manufacturer instructions',
    ],
    correctAnswer: 0,
    explanation:
      'The tests specified in Regulations 643.2 to 643.6 inclusive, where relevant, are conducted in the order shown prior to the installation being energised. Working out of order can leave a fault undetected until a live test exposes the tester to it.',
    section: 'Initial verification',
    difficulty: 'advanced',
    topic: 'Order of the pre-energisation test sequence',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 444,
    question:
      'During the initial verification test sequence a defect that materially affects safety is found. What does Guidance Note 3 require?',
    options: [
      'It is recorded as a departure and the installation energised as planned',
      'It shall be remedied before the installation is energised',
      'It is referred to the client for a decision after energisation',
      'It is retested at the next periodic inspection of the installation',
    ],
    correctAnswer: 1,
    explanation:
      'Defects found during the test sequence should be addressed before energisation, and where a defect materially affects safety it must be remedied before the installation is energised. Energising first and recording the defect as a departure is not acceptable.',
    section: 'Initial verification',
    difficulty: 'advanced',
    topic: 'Defects found before energisation',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 445,
    question:
      'A lighting circuit has accessory boxes on plastic pattresses that are not connected to earthed building fabric. What will a continuity measurement from the fitting to the origin represent?',
    options: [
      'The resistance of the protective conductor alone, R2',
      'The external earth fault loop impedance of the supply, Ze',
      'The sum of the line and protective conductor resistances, R1 + R2',
      'The insulation resistance between line and protective conductor',
    ],
    correctAnswer: 2,
    explanation:
      'Where accessory boxes are not connected to the building fabric or other earthed elements, no parallel path exists and the reading is the sum of the line and protective conductor resistances, R1 + R2. If the boxes were earthed through the fabric, a lower and misleading value would be obtained.',
    section: 'Continuity testing',
    difficulty: 'advanced',
    topic: 'Interpreting R1 + R2 without parallel paths',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 446,
    question: 'Why is the external earth fault loop impedance Ze measured at the origin?',
    options: [
      'So the prospective short-circuit current between lines is known',
      'So the insulation resistance of the supply tails can be verified',
      'So the RCD operating current at the origin can be confirmed',
      'So it can be added to circuit R1 + R2 values to determine Zs',
    ],
    correctAnswer: 3,
    explanation:
      'Measuring Ze at the origin gives the external component of the loop, which is added to the measured conductor resistances R1 + R2 to determine the circuit earth fault loop impedance Zs. Zs is then compared with the maximum permitted value for the protective device to confirm disconnection times.',
    section: 'Earth fault loop impedance',
    difficulty: 'intermediate',
    topic: 'Purpose of measuring Ze',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 447,
    question: 'A measured Ze may only be added to circuit R1 + R2 values under what condition?',
    options: [
      'The main bonding is left connected throughout the measurement',
      'The measurement is taken with the main switch closed and load connected',
      'The measurement is repeated at each distribution board on the installation',
      'The earthing and extraneous parts are isolated so no parallel paths exist',
    ],
    correctAnswer: 3,
    explanation:
      'A measured Ze is only suitable for addition to R1 + R2 when the earthing conductor and extraneous-conductive-parts have been correctly disconnected so that no parallel paths contribute. A Ze read with bonding still connected is optimistically low and will understate the calculated Zs.',
    section: 'Earth fault loop impedance',
    difficulty: 'advanced',
    topic: 'Parallel paths invalidating a Ze reading',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 448,
    question: 'What is the subject of HSE Guidance Note GS38?',
    options: [
      'Safe working practice for excavation near buried services',
      'Electrical test equipment for use on low voltage systems',
      'The selection of personal protective equipment for electricians',
      'Requirements for the periodic inspection of fixed installations',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 is the HSE guidance note titled Electrical test equipment for use on low voltage electrical systems. Its safety procedures are to be observed whenever electrical test equipment is used for inspection and testing, and it governs the selection, inspection and safe use of instruments and leads.',
    section: 'Test equipment',
    difficulty: 'basic',
    topic: 'Scope of HSE GS38',
    category: 'Safe Isolation',
  },
  {
    id: 449,
    question:
      'Guidance Note 3 requires the inspector to do what immediately after making a circuit dead and isolating it?',
    options: [
      'Begin the continuity tests, as isolation has already been proved',
      'Fit a caution notice and leave the circuit for the client to check',
      'Verify the absence of voltage before starting work or dead tests',
      'Record the isolation point on the schedule of test results sheet',
    ],
    correctAnswer: 2,
    explanation:
      'After making equipment or part of an installation dead and safely isolated, absence of voltage must be verified before work or non-live testing begins. Verification is by a suitable voltage indicator used in accordance with GS38 and best-practice safe isolation, not by assuming the isolation worked.',
    section: 'Safe isolation',
    difficulty: 'intermediate',
    topic: 'Verifying absence of voltage after isolation',
    category: 'Safe Isolation',
  },
  {
    id: 450,
    question: 'What does the polarity test on a single-phase final circuit confirm?',
    options: [
      'That the phase and neutral conductors are not reversed at accessories',
      'That the circuit conductors carry no residual charge before testing',
      'That the protective conductor is continuous back to the main earth bar',
      'That the circuit breaker will disconnect within the required time',
    ],
    correctAnswer: 0,
    explanation:
      'Polarity verification confirms that line and neutral are correctly connected at accessories and have not been transposed, so that single-pole devices and protective devices are in the line conductor. Continuity of the protective conductor and disconnection time are separate tests with their own results.',
    section: 'Polarity',
    difficulty: 'intermediate',
    topic: 'What polarity verification proves',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 451,
    question:
      'Guidance Note 3 identifies three general methods for assessing earth electrode resistance. Which describes method E2?',
    options: [
      'A stakeless or clamp-type dedicated earth electrode tester',
      'A dedicated tester using the fall-of-potential technique',
      'An earth fault loop impedance tester used at the electrode',
      'A four-terminal bridge comparing the electrode with a rod',
    ],
    correctAnswer: 0,
    explanation:
      'Method E2 is a dedicated stakeless or clamp-type electrode tester, sometimes called probeless, which needs no auxiliary spikes driven into the soil. E1 is the fall-of-potential dedicated tester and E3 uses an earth fault loop impedance tester.',
    section: 'Earth electrode testing',
    difficulty: 'advanced',
    topic: 'Earth electrode test methods E1 to E3',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 452,
    question:
      'Why does Guidance Note 3 require a four-terminal earth tester when the most accurate electrode resistance is needed?',
    options: [
      'It applies a higher test current than a three-terminal instrument',
      'It allows the reading to be taken without disconnecting the electrode',
      'It compensates automatically for seasonal variation in soil moisture',
      'It separates current and potential connections, excluding lead resistance',
    ],
    correctAnswer: 3,
    explanation:
      'The four-terminal arrangement keeps the current and potential connections separate, so the resistance of the test leads is excluded from the reading and the value obtained is that of the electrode and surrounding soil alone.',
    section: 'Earth electrode testing',
    difficulty: 'advanced',
    topic: 'Four-terminal electrode tester',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 453,
    question:
      'Guidance Note 3 suggests testing an earth electrode under the least favourable conditions. Which is an example of such a condition?',
    options: [
      'Immediately after a period of prolonged heavy rainfall on the site',
      'When the ground surrounding the electrode is frozen',
      'When the installation is carrying its maximum design load',
      'During the warmest part of a summer day with damp soil',
    ],
    correctAnswer: 1,
    explanation:
      'Frozen ground raises the measured resistance, so testing then gives a conservative worst-case figure. Testing after heavy rain gives an optimistically low value that may not hold for the rest of the year.',
    section: 'Earth electrode testing',
    difficulty: 'advanced',
    topic: 'Least favourable conditions for electrode testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 454,
    question:
      'How does a loop impedance test instrument derive the prospective fault current that it displays?',
    options: [
      'It injects a calibrated fault current and measures the resulting dip',
      'It multiplies the measured loop impedance by the nominal voltage',
      'It divides the nominal mains voltage by the measured loop impedance',
      'It compares the reading against a stored table of supply capacities',
    ],
    correctAnswer: 2,
    explanation:
      'The prospective fault current is derived, not directly measured: the instrument divides the nominal mains voltage by the measured loop impedance. The basic measuring principle is identical to that of an earth fault loop impedance tester.',
    section: 'Prospective fault current',
    difficulty: 'advanced',
    topic: 'How PFC is derived from loop impedance',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 455,
    question:
      'What happens to the accuracy of a prospective fault current value derived from a loop impedance reading?',
    options: [
      'It decreases as the scale reading rises, since voltage is divided by it',
      'It is unaffected by the magnitude of the loop impedance reading taken',
      'It improves as the loop impedance rises because the current gets smaller',
      'It depends solely on the calibration date recorded for the instrument',
    ],
    correctAnswer: 0,
    explanation:
      'Because the derived current comes from dividing the nominal voltage by the loop impedance, accuracy falls away as the scale reading increases: a larger loop value produces a smaller derived current with a proportionally larger relative error.',
    section: 'Prospective fault current',
    difficulty: 'advanced',
    topic: 'Accuracy limits of derived PFC readings',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 456,
    question: 'What is meant by functional testing during initial verification?',
    options: [
      'Measuring the current drawn by each item of equipment under load',
      'Operating equipment to confirm it works and is correctly installed',
      'Confirming the circuit charts match the labelling at the board',
      'Checking that the design current does not exceed the cable rating',
    ],
    correctAnswer: 1,
    explanation:
      'Functional testing means operating switchgear, controls, interlocks and RCDs to confirm that they work and are properly installed, mounted and adjusted. It is an operational check, not a measurement, and it complements the instrument tests.',
    section: 'Functional testing',
    difficulty: 'intermediate',
    topic: 'Definition of functional testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 457,
    question:
      'An energised RCD has its integral test button operated. What is the acceptance criterion?',
    options: [
      'The device shows a fault indication but need not open the circuit',
      'The device latches out and requires the supply to be re-energised',
      'The device operates within the time recorded during instrument testing',
      'The device trips and isolates the circuit it protects',
    ],
    correctAnswer: 3,
    explanation:
      'Operating the built-in test button on an energised RCD must cause the device to trip and isolate the protected circuit. Failure to trip is a failed functional test, and the device must be investigated or replaced. The button checks the mechanism, not the tripping time.',
    section: 'RCD testing',
    difficulty: 'intermediate',
    topic: 'RCD integral test button criterion',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 458,
    question:
      'The operation of the main switch is verified during initial verification as what kind of check?',
    options: [
      'A dead test carried out before the sequence of tests begins',
      'A continuity check between the incoming and outgoing terminals',
      'A functional check, with the switch operated and the result recorded',
      'An inspection item only, requiring no operation of the switch itself',
    ],
    correctAnswer: 2,
    explanation:
      'The main switch is subject to a functional check: the inspector physically operates it to verify correct function and records the result. Looking at it without operating it proves nothing about the mechanism.',
    section: 'Functional testing',
    difficulty: 'intermediate',
    topic: 'Functional check of the main switch',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 459,
    question: 'When should the continuity tests required by Regulation 643.2.1 be carried out?',
    options: [
      'Before circuits are energised for functional tests, where practicable',
      'After the installation has been energised and left on load',
      'Only where the installer suspects a broken protective conductor',
      'At the first periodic inspection rather than initial verification',
    ],
    correctAnswer: 0,
    explanation:
      'Continuity testing is part of the pre-energisation sequence for initial verification and should be performed before circuits are energised for functional tests wherever reasonably practicable. The results are recorded in the installation documentation.',
    section: 'Continuity testing',
    difficulty: 'basic',
    topic: 'When continuity tests are performed',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 460,
    question:
      'How is compliance with the measures against electromagnetic disturbances verified on an installation?',
    options: [
      'By calculating the expected disturbance level from the design data',
      'By inspecting mitigation, measuring where appropriate and functional tests',
      'By a declaration of conformity supplied by the equipment manufacturer',
      'By an insulation resistance test at 500 V DC applied to each circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Verification of measures against electromagnetic disturbances combines inspection of the installed mitigation, such as SPDs, filters, screens and bonding, measurement of disturbance or residual voltage where appropriate, and functional testing of protective devices, with the results recorded.',
    section: 'Inspection',
    difficulty: 'advanced',
    topic: 'Verifying electromagnetic disturbance measures',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 461,
    question:
      'For a correctly connected ring final circuit, what should the step 2 line-to-neutral measurement give at each socket-outlet?',
    options: [
      'The sum of the line and neutral open loop resistances',
      'Half the line open loop resistance measured at step 1',
      'A quarter of the summed line and neutral open loop resistances',
      'The same value as the protective conductor loop resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Cross-connecting the line and neutral legs puts two equal halves of the ring in parallel, so a correctly connected ring reads one quarter of the combined open loop resistance of line and neutral, and reads substantially the same at every socket on the ring. A rogue high reading points to a spur or a broken leg.',
    section: 'Ring final circuits',
    difficulty: 'advanced',
    topic: 'Expected step 2 reading on a ring',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 462,
    question:
      'In the ring final circuit continuity procedure, in what order are the end-to-end resistances measured?',
    options: [
      'r1 for one conductor loop, then rx, then rz for the protective loop',
      'rz for the protective conductor loop first, then r1 and then rx',
      'rx and rz together, with r1 derived arithmetically from the two',
      'r1 and rz at the same time, with rx taken only if a fault shows',
    ],
    correctAnswer: 0,
    explanation:
      'The procedure takes r1 first for one conductor loop, then rx for the other, then rz for the protective conductor loop. Comparing the three end-to-end values before any cross-connection is what exposes a break or a conductor of reduced cross-sectional area.',
    section: 'Ring final circuits',
    difficulty: 'advanced',
    topic: 'Order of ring end-to-end measurements',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 463,
    question:
      'What is the cross-connection technique used in ring final circuit continuity testing intended to reveal?',
    options: [
      'The temperature rise of the conductors under full load current',
      'The insulation resistance between the two legs of the ring',
      'Whether the protective device is correctly rated for the ring',
      'Cross-connections or breaks in the parallel conductor paths',
    ],
    correctAnswer: 3,
    explanation:
      'The method applies where two conductors provide parallel paths for line and neutral with protective conductors present. Cross-connecting and then measuring around the ring verifies conductor continuity and detects cross-connections or breaks that the end-to-end readings alone can hide.',
    section: 'Ring final circuits',
    difficulty: 'advanced',
    topic: 'Purpose of the cross-connection method',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 464,
    question:
      'SELV conductors run in a multicore cable alongside low voltage circuits and are separated by insulation alone. What insulation resistance test applies?',
    options: [
      '250 V DC, with a minimum acceptable value of 0.5 MΩ',
      '500 V DC, with a value of not less than 1 MΩ required',
      '500 V DC, with a minimum acceptable value of 0.25 MΩ',
      '1000 V DC, with a value of not less than 2 MΩ required',
    ],
    correctAnswer: 1,
    explanation:
      'Where SELV or PELV conductors are separated from low voltage conductors only by the insulation covering the conductors, as in a shared multicore, the test voltage is increased to 500 V DC and the insulation resistance must be not less than 1 MΩ. The usual reduced-voltage SELV test does not apply here.',
    section: 'Insulation resistance',
    difficulty: 'advanced',
    topic: 'SELV sharing insulation with LV conductors',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 465,
    question:
      'An electrically separated circuit is tested at 500 V DC between its live conductors and the transformer secondary live conductors. What is the minimum acceptable value?',
    options: [
      '0.5 MΩ, the figure that applies to a normal PELV circuit test',
      '2 MΩ, reflecting the higher integrity that separation demands',
      '1 MΩ, the minimum stated for this basic separation test',
      '0.25 MΩ, on the basis that no earth reference is present',
    ],
    correctAnswer: 2,
    explanation:
      'For electrically separated circuits tested at 500 V DC, the insulation resistance between the separated live conductors and the transformer secondary live conductors must be not less than 1 MΩ. This is the acceptance criterion for the basic separation test.',
    section: 'Insulation resistance',
    difficulty: 'advanced',
    topic: 'Separation test minimum value',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 466,
    question:
      'A thermal imaging survey shows one terminal noticeably hotter than its neighbours. What does this establish?',
    options: [
      'A relative difference that may indicate a fault, needing confirmation',
      'A confirmed loose connection that can be recorded as a defect',
      'An overloaded circuit requiring the protective device to be uprated',
      'An insulation failure between the terminal and the enclosure body',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal imaging gives relative temperature differences, not an absolute diagnosis. A hotter reading may indicate something such as a loose connection, but further inspection and electrical testing are needed to confirm the cause and its extent before any remedial action is specified.',
    section: 'Fault diagnosis',
    difficulty: 'intermediate',
    topic: 'What thermal imaging can and cannot prove',
    category: 'Fault Finding',
  },
  {
    id: 467,
    question:
      'Guidance Note 3 states the purpose of record keeping for inspection and testing. Which is one of those purposes?',
    options: [
      'To transfer legal liability for the installation to the client',
      'To satisfy an insurer that the contractor holds indemnity cover',
      'To establish the resale value of the property at a later date',
      'To assist future inspection, maintenance and fault finding work',
    ],
    correctAnswer: 3,
    explanation:
      'Records provide evidence of the work carried out, support future inspection and testing, demonstrate compliance with BS 7671, and assist fault finding and maintenance. They should be sufficient to show the condition of the installation at the time of the inspection or test.',
    section: 'Documentation',
    difficulty: 'intermediate',
    topic: 'Purpose of inspection and test records',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 468,
    question:
      'What information should the specification provide so that an installation can be tested and maintained in future?',
    options: [
      'The cost breakdown for each circuit and the labour hours allowed',
      'Drawings, circuit lists, protective device details and instructions',
      'Manufacturer warranty documents for every accessory that is fitted',
      'A schedule of the test instruments the contractor intends to use',
    ],
    correctAnswer: 1,
    explanation:
      'Adequate information for testing and future maintenance means drawings, circuit lists, protective device details and any special instructions needed for routine inspection and testing or for fault finding. Without it, the next person on site has to derive the installation from scratch.',
    section: 'Documentation',
    difficulty: 'advanced',
    topic: 'Information needed for future testing',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 469,
    question: 'What should be recorded when carrying out ring final circuit continuity testing?',
    options: [
      'The socket-outlet positions alone, as values vary around the ring',
      'The highest reading obtained, as the other values are not needed',
      'The measured values, instrument used, conditions and any notes',
      'A pass or fail entry, with figures kept in the contractor records',
    ],
    correctAnswer: 2,
    explanation:
      'The measured values, the test instrument used, the test conditions and any interpretation notes, such as a protective conductor of reduced cross-sectional area, are all recorded. These records support certification and any later fault diagnosis on the circuit.',
    section: 'Ring final circuits',
    difficulty: 'basic',
    topic: 'Recording ring continuity results',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 470,
    question: 'What is measured at step 3 of the ring final circuit continuity procedure?',
    options: [
      'Line to protective conductor resistance at each socket-outlet',
      'Neutral to protective conductor resistance at the origin only',
      'Insulation resistance between line and the protective conductor',
      'The earth fault loop impedance at the furthest point on the ring',
    ],
    correctAnswer: 0,
    explanation:
      'Step 3 cross-connects the line and protective conductors and measures line to protective conductor resistance at each socket-outlet in turn. A correctly wired ring gives a substantially equal reading at every point, and that reading is the circuit R1 + R2.',
    section: 'Ring final circuits',
    difficulty: 'advanced',
    topic: 'Ring final circuit step 3 measurement',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 471,
    question:
      'What distinguishes the multiple-signature Electrical Installation Certificate given in Appendix 6 of BS 7671?',
    options: [
      'It is issued only where more than one contractor is on the site',
      'Design, construction, and inspection and testing are signed separately',
      'It requires the client to countersign each stage before the next',
      'It replaces the need for a schedule of test results to be attached',
    ],
    correctAnswer: 1,
    explanation:
      'The multiple-signature form is the Appendix 6 model used for initial certification where different persons take responsibility for the design, the construction, and the inspection and testing of the installation or modification, each signing their own part.',
    section: 'Certification',
    difficulty: 'advanced',
    topic: 'Multiple-signature EIC',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 472,
    question:
      'Who signs the inspection and testing section, Section C, of an Electrical Installation Certificate?',
    options: [
      'The designer, who carries overall responsibility for the works',
      'The client or their appointed representative on the project',
      'The building control body notified of the notifiable work',
      'The party responsible for inspecting and testing the installation',
    ],
    correctAnswer: 3,
    explanation:
      'The party that carried out the inspection and testing signs Section C. That signature records responsibility for the inspection, for the testing, and for comparing the results obtained against the relevant criteria.',
    section: 'Certification',
    difficulty: 'intermediate',
    topic: 'Who signs EIC Section C',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 473,
    question: 'What is the purpose of an Electrical Installation Certificate?',
    options: [
      'To record inspection and test results and identify the work covered',
      'To confirm the installer belongs to a competent person scheme',
      'To transfer responsibility for the installation to the occupier',
      'To list the materials and accessories supplied under the contract',
    ],
    correctAnswer: 0,
    explanation:
      'The EIC is the formal certificate recording the results of inspection and testing and identifying the work that is the subject of the certificate. It also carries the signatory details, the dates and the recommendation for the next inspection.',
    section: 'Certification',
    difficulty: 'intermediate',
    topic: 'Purpose of the EIC',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 474,
    question:
      'Before taking measurements that will be entered on a Schedule of Test Results, what does Guidance Note 3 require of the test leads and probes?',
    options: [
      'They are replaced with a new set at the start of every project',
      'They are proved on a known live supply before each measurement',
      'They are visually inspected for damage, cracks or poor contacts',
      'They are checked against the calibration certificate held on file',
    ],
    correctAnswer: 2,
    explanation:
      'A visual inspection of leads, probes and connectors is made before recorded measurements are taken, to find deterioration, damage, cracked insulation, exposed conductors or poor contacts. Any of these can produce an inaccurate reading that then goes on the certificate as fact.',
    section: 'Test equipment',
    difficulty: 'advanced',
    topic: 'Pre-use checks on leads and probes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 475,
    question:
      'Which practical information does the IET On-Site Guide provide to assist general installation work?',
    options: [
      'Tender pricing rates and labour allowances for common circuits',
      'Conduit and trunking capacities and the bending radii of cables',
      'Model wording for departures recorded on an installation certificate',
      'Statutory notification thresholds for work in commercial premises',
    ],
    correctAnswer: 1,
    explanation:
      'The On-Site Guide carries the practical data needed in general installation work, including conduit and trunking capacities and cable bending radii, so that routing and mechanical protection can be got right on site rather than derived from first principles.',
    section: 'Wiring systems',
    difficulty: 'intermediate',
    topic: 'Practical content of the On-Site Guide',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 476,
    question: 'What does good practice require where cables enter an enclosure?',
    options: [
      'The sheath is stripped back at the gland to aid heat dissipation',
      'The entry is left unsealed so that condensation can drain freely',
      'The cable is drawn in tightly so that no slack remains inside',
      'Grommets, glands or conduit protect the sheath and radii are kept',
    ],
    correctAnswer: 3,
    explanation:
      'Suitable mechanical protection such as grommets, glands or conduit is fitted at the entry, the sheathing is protected from chafing, and the required bending radius is maintained. This is what prevents conductor damage at the point of entry, which is a classic AM2 inspection fail.',
    section: 'Wiring systems',
    difficulty: 'intermediate',
    topic: 'Cable entries into enclosures',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 477,
    question: 'In Guidance Note 3, what does the term periodic inspection denote?',
    options: [
      'A visual examination carried out without any testing at all',
      'A review of the previous certificate and its recorded results',
      'An inspection including any tests needed to assess condition',
      'A sampling exercise covering an agreed percentage of circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Periodic inspection is not limited to looking. It denotes an inspection activity that includes whatever testing is necessary to assess the condition of the installation, and the tests required to reach the conclusion form part of the inspection.',
    section: 'Periodic inspection',
    difficulty: 'advanced',
    topic: 'What periodic inspection includes',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 478,
    question: 'What is a visual inspection of an installation intended to identify?',
    options: [
      'Common defects caused by use or abuse of the installation',
      'The precise value of the earth fault loop impedance present',
      'Whether the original design current calculations were correct',
      'Deterioration of insulation hidden within the wiring system',
    ],
    correctAnswer: 0,
    explanation:
      'A visual inspection, carried out without placing the inspector or anyone else in danger, reveals many of the common defects caused by use or abuse: visible wear, damage, deterioration and unsound alterations. Hidden insulation deterioration needs an instrument test to find.',
    section: 'Inspection',
    difficulty: 'basic',
    topic: 'Purpose of visual inspection',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 479,
    question:
      'Full electrical testing of an installation would need isolation that is impractical to arrange. What does Guidance Note 3 allow?',
    options: [
      'The tests are omitted and the report issued as unsatisfactory',
      'The installation is assessed from the previous report instead',
      'The client signs a waiver accepting the untested condition',
      'A thorough documented visual inspection may evidence condition',
    ],
    correctAnswer: 3,
    explanation:
      'Where isolation for full testing is impractical, a thorough visual inspection may be carried out and accepted as evidence of the condition of the installation, provided it is comprehensive and documented as part of planned maintenance or periodic assessment.',
    section: 'Inspection',
    difficulty: 'advanced',
    topic: 'Visual inspection where isolation is impractical',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 480,
    question:
      'How should conduit capacity and cable bending radius figures taken from the On-Site Guide be used?',
    options: [
      'As absolute limits that override any manufacturer instruction',
      'Cross-checked against cable manufacturer data and BS 7671',
      'As guidance for domestic work but not for commercial premises',
      'As values to be applied after adding a ten per cent margin',
    ],
    correctAnswer: 1,
    explanation:
      'The Guide states that its practical data may need cross-checking against cable manufacturer information and the requirements of BS 7671. The installer has to confirm the figures are appropriate for the particular cable and the particular installation conditions.',
    section: 'Wiring systems',
    difficulty: 'intermediate',
    topic: 'Limits of On-Site Guide practical data',
    category: 'BS7671 Selection & Erection',
  },
];

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility functions for question selection
export const getQuestionsByCategory = (category: AM2Question['category']): AM2Question[] => {
  return am2QuestionBank.filter((question) => question.category === category);
};

export const getQuestionsByDifficulty = (difficulty: AM2Question['difficulty']): AM2Question[] => {
  return am2QuestionBank.filter((question) => question.difficulty === difficulty);
};

// Get random questions with balanced distribution across categories
export const getRandomQuestions = (
  count: number,
  weights: { basic: number; intermediate: number; advanced: number } = {
    basic: 0.3,
    intermediate: 0.5,
    advanced: 0.2,
  }
): AM2Question[] => {
  const categories: AM2Question['category'][] = [
    'Health & Safety',
    'BS7671 Fundamentals',
    'BS7671 Selection & Erection',
    'BS7671 Inspection & Testing',
    'Building Regulations',
    'Safe Isolation',
    'Fault Finding',
  ];

  // Calculate questions per category
  const basePerCategory = Math.floor(count / categories.length);
  const remainder = count % categories.length;

  const selectedQuestions: AM2Question[] = [];

  categories.forEach((category, index) => {
    const categoryQuestions = getQuestionsByCategory(category);
    const targetCount = basePerCategory + (index < remainder ? 1 : 0);

    if (categoryQuestions.length === 0) return;

    // Apply difficulty weighting within each category
    const basicCount = Math.round(targetCount * weights.basic);
    const intermediateCount = Math.round(targetCount * weights.intermediate);
    const advancedCount = Math.max(0, targetCount - basicCount - intermediateCount);

    const categoryBasic = categoryQuestions.filter((q) => q.difficulty === 'basic');
    const categoryIntermediate = categoryQuestions.filter((q) => q.difficulty === 'intermediate');
    const categoryAdvanced = categoryQuestions.filter((q) => q.difficulty === 'advanced');

    // Select questions
    const selectedBasic = shuffleArray(categoryBasic).slice(
      0,
      Math.min(basicCount, categoryBasic.length)
    );
    const selectedIntermediate = shuffleArray(categoryIntermediate).slice(
      0,
      Math.min(intermediateCount, categoryIntermediate.length)
    );
    const selectedAdvanced = shuffleArray(categoryAdvanced).slice(
      0,
      Math.min(advancedCount, categoryAdvanced.length)
    );

    selectedQuestions.push(...selectedBasic, ...selectedIntermediate, ...selectedAdvanced);
  });

  // If we don't have enough, fill from any category
  if (selectedQuestions.length < count) {
    const remaining = am2QuestionBank.filter((q) => !selectedQuestions.includes(q));
    const needed = count - selectedQuestions.length;
    selectedQuestions.push(...shuffleArray(remaining).slice(0, needed));
  }

  return shuffleArray(selectedQuestions).slice(0, count);
};

export const getQuestionsByTopic = (
  categories: AM2Question['category'][],
  questionCounts: number[]
): AM2Question[] => {
  const selectedQuestions: AM2Question[] = [];

  categories.forEach((category, index) => {
    const categoryQuestions = getQuestionsByCategory(category);
    const count = questionCounts[index] || 0;
    selectedQuestions.push(...shuffleArray(categoryQuestions).slice(0, count));
  });

  return shuffleArray(selectedQuestions);
};
