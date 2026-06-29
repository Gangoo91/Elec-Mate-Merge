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
    difficulty: 'basic',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'Penalties',
    category: 'Health & Safety',
  },
  {
    id: 7,
    question: 'Under HASAWA, must employers consult with employees on health and safety matters?',
    options: [
      'No, consultation is entirely at the employer’s discretion',
      'Only where a recognised trade union is present on site',
      'Only for companies employing more than 50 people',
      'Yes, either directly or through safety representatives',
    ],
    correctAnswer: 3,
    explanation:
      'Employers must consult employees on health and safety matters, either directly or through elected safety representatives.',
    section: 'HASAWA 1974',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
      'Inspect, test, certify, document and review the installation',
      'Plan, do, check, act and report to the enforcing authority',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Assess, isolate, lock off, prove dead and label the circuit',
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
      'A hazard is a minor issue; a risk is a serious issue',
      'A hazard applies to people; a risk applies to equipment',
      'A hazard is the likelihood of harm; risk is the source of harm',
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
      'Only when requested by an HSE inspector',
      'Every ten years, in line with periodic inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments should be reviewed when significant changes occur, after incidents, when new information emerges, or periodically to ensure they remain valid.',
    section: 'Risk Assessment',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
    topic: 'Definition',
    category: 'Health & Safety',
  },
  {
    id: 20,
    question: 'Under RIDDOR, which electrical incidents must be reported?',
    options: [
      'Electric shock or burn causing death, specified injury, or incapacity for more than 7 days',
      'Any electric shock, however minor, felt by an employee',
      'Any circuit that trips its protective device more than once',
      'Any installation found to be non-compliant with BS 7671',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
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
    difficulty: 'basic',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
    topic: 'Employee Duties',
    category: 'Health & Safety',
  },

  // CDM Regulations (5 questions)
  {
    id: 29,
    question: 'What do CDM Regulations apply to?',
    options: [
      'Only large commercial building projects',
      'All construction work including electrical installation',
      'Only projects lasting more than 30 working days',
      'Only work carried out on domestic dwellings',
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
      'Only the principal contractor on site',
      'Only the client funding the project',
      'Clients, principal designers, principal contractors, designers and contractors',
      'Only the architect and structural engineer',
    ],
    correctAnswer: 2,
    explanation:
      'CDM places duties on all duty holders: clients, principal designers, principal contractors, designers, contractors and workers.',
    section: 'CDM Regulations',
    difficulty: 'intermediate',
    topic: 'Duty Holders',
    category: 'Health & Safety',
  },
  {
    id: 31,
    question: 'When is a principal contractor required under CDM?',
    options: [
      'Only on projects worth more than £100,000',
      'Only when the client requests one in writing',
      'On every construction project without exception',
      'When there is more than one contractor on site',
    ],
    correctAnswer: 3,
    explanation:
      'A principal contractor must be appointed when there is more than one contractor working on a construction project.',
    section: 'CDM Regulations',
    difficulty: 'intermediate',
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
      'Only work undertaken on a scaffold or MEWP',
      'Only work performed on a roof or other elevated structure',
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
    difficulty: 'basic',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
    topic: 'RCD Rating',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 140,
    question: 'When is additional protection by 30mA RCD required?',
    options: [
      'For socket outlets up to 32A and mobile equipment outdoors',
      'Only for circuits supplying fixed heating appliances',
      'Only for three-phase distribution circuits',
      'Only where the earthing system is TT',
    ],
    correctAnswer: 0,
    explanation:
      'Additional protection by 30mA RCD is required for socket outlets ≤32A and mobile equipment used outdoors (411.3.3).',
    section: 'Protective Devices',
    difficulty: 'intermediate',
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
    difficulty: 'advanced',
    topic: 'RCD Types',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 142,
    question: 'What is a Type D MCB used for?',
    options: [
      'Purely resistive circuits such as immersion heaters',
      'General lighting and socket-outlet final circuits',
      'Circuits with very high inrush currents like transformers and X-ray equipment',
      'Circuits requiring residual current protection',
    ],
    correctAnswer: 2,
    explanation:
      'Type D MCBs (trip at 10-20 × In) are for circuits with very high inrush currents like transformers, welding equipment, X-ray machines.',
    section: 'Protective Devices',
    difficulty: 'advanced',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'Bonding Size',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 145,
    question: 'What extraneous-conductive-parts require main protective bonding?',
    options: [
      'Only metal water pipes within the bathroom',
      'Gas, water, oil pipes, structural steel, central heating and air conditioning systems',
      'Only the consumer unit enclosure and meter tails',
      'All plastic service pipes entering the building',
    ],
    correctAnswer: 1,
    explanation:
      'Main bonding is required to gas, water, oil pipes, structural metalwork, and metallic service pipes (411.3.1.2).',
    section: 'Bonding',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'Zs Formula',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 197,
    question: 'Why must measured Zs values be lower than tabulated maximum values?',
    options: [
      'To allow for the tolerance of the test instrument',
      'To allow for increased resistance when conductors are at operating temperature',
      'To allow for additional circuits being added later',
      'To allow for the supply voltage rising above nominal',
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
    difficulty: 'intermediate',
    topic: 'Zs Values',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 199,
    question: 'How can R1+R2 be measured for a circuit?',
    options: [
      'By applying 500V DC between line and earth conductors',
      'By measuring the loop impedance at the origin only',
      'By energising the circuit and measuring the load current',
      'By measuring at the origin with line and cpc connected and measuring at the furthest point',
    ],
    correctAnswer: 3,
    explanation:
      'Connect line and cpc together at the origin, measure resistance at the furthest point. This gives R1+R2 directly.',
    section: 'Loop Impedance',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'Test Methods',
    category: 'BS7671 Inspection & Testing',
  },

  // RCD Testing (15 questions)
  {
    id: 201,
    question: 'At what current should a 30mA RCD trip when tested between 50% and 100% of its rating?',
    options: [
      'Between 5mA and 15mA',
      'Between 15mA and 30mA (50-100% of rated current)',
      'Between 30mA and 60mA',
      'Between 60mA and 150mA',
    ],
    correctAnswer: 1,
    explanation:
      'An RCD should trip between 50% and 100% of its rated residual current - for 30mA, between 15mA and 30mA.',
    section: 'RCD Testing',
    difficulty: 'intermediate',
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
    question: 'What is the maximum trip time for additional protection RCDs at 5×IΔn?',
    options: [
      '150ms',
      '1000ms',
      '300ms',
      '40ms',
    ],
    correctAnswer: 3,
    explanation:
      'For additional protection (30mA RCDs), maximum trip time at 5×IΔn (150mA) is 40ms.',
    section: 'RCD Testing',
    difficulty: 'intermediate',
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
    difficulty: 'basic',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'advanced',
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
    difficulty: 'advanced',
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
    difficulty: 'basic',
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
    difficulty: 'basic',
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
      'Adding a fused spur to an existing circuit outside special locations',
      'Installing a new circuit',
      'Replacing a light fitting',
    ],
    correctAnswer: 2,
    explanation:
      'Installing a new circuit is notifiable. Simple replacements and non-notifiable additions like fused spurs do not require notification.',
    section: 'Part P',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
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
    difficulty: 'basic',
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
    difficulty: 'intermediate',
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
      'Installing a new circuit from the consumer unit',
      'Adding a socket outlet to an existing circuit (not in special location)',
      'Replacing the consumer unit',
      'Installing a new circuit in a bathroom',
    ],
    correctAnswer: 1,
    explanation:
      'Adding a socket to an existing circuit outside special locations is non-notifiable (but must still comply with BS 7671).',
    section: 'Non-notifiable',
    difficulty: 'intermediate',
    topic: 'Examples',
    category: 'Building Regulations',
  },
  {
    id: 262,
    question: 'Although not notifiable, what must all electrical work still comply with?',
    options: [
      'Nothing in particular',
      'Only customer wishes',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
      'Only L1 and the neutral conductor',
    ],
    correctAnswer: 0,
    explanation:
      'All three phases and the neutral must be proven dead as any could be energised due to faults or backfeed.',
    section: 'Three Phase',
    difficulty: 'intermediate',
    topic: 'Three-Phase Isolation',
    category: 'Safe Isolation',
  },

  // Test Equipment (15 questions)
  {
    id: 309,
    question: 'Why are two-pole voltage testers preferred over single-pole neon testers?',
    options: [
      'They are cheaper and easier to carry on site',
      'They measure voltage reliably between two points, unlike a neon that can mislead',
      'They can also measure insulation resistance and continuity',
      'They do not need to be proved on a known live source',
    ],
    correctAnswer: 1,
    explanation:
      'Two-pole testers measure voltage between two points (L-N, L-E), providing reliable detection unlike neon testers that can give false readings.',
    section: 'Test Equipment',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
      'For any domestic socket-outlet addition',
      'Whenever a Minor Works Certificate is issued',
      'For high-risk work, especially on HV systems or in industrial environments',
      'Only when working alone on a final circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Permit to work systems are used for high-risk activities, including HV systems, complex isolations, or where multiple teams work.',
    section: 'Permits',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'Test Methods',
    category: 'Fault Finding',
  },
  {
    id: 354,
    question: 'Before starting electrical fault finding, what must be done first?',
    options: [
      'Order the replacement parts likely to be needed',
      'Inform the customer of the expected repair cost',
      'Conduct a risk assessment and ensure safe isolation where appropriate',
      'Issue a Minor Works Certificate for the repair',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'RCD Tripping',
    category: 'Fault Finding',
  },
  {
    id: 358,
    question: 'What causes a high resistance joint?',
    options: [
      'Over-tightened terminals crushing the conductor',
      'Using a conductor of too large a cross-section',
      'Poor connections, oxidation, incorrect termination, or mechanical damage',
      'Excessive insulation resistance at the termination',
    ],
    correctAnswer: 2,
    explanation:
      'High resistance joints result from loose connections, corrosion, incorrect termination, or damage, causing heat and potential fire risk.',
    section: 'Common Faults',
    difficulty: 'intermediate',
    topic: 'High Resistance',
    category: 'Fault Finding',
  },
  {
    id: 359,
    question: 'How can a high resistance joint be identified?',
    options: [
      'An insulation resistance reading below 1.0MΩ',
      'A residual current that trips the RCD repeatedly',
      'A prospective fault current above the device rating',
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
      'An oversized circuit protective conductor',
      'Correctly rated and well-terminated conductors',
      'Loose connections, failing lamps, incompatible dimmer, or supply issues',
      'An RCD set to a higher residual current rating',
    ],
    correctAnswer: 2,
    explanation:
      'Flickering can indicate loose connections, failing lamp/driver, incompatible dimmer with LED lamps, or supply voltage fluctuations.',
    section: 'Common Faults',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
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
      'Automatic Monitoring Device',
      'Additional Monitoring Document',
      'Amendment',
      'Applied Maximum Demand',
    ],
    correctAnswer: 2,
    explanation: 'AMD refers to Amendments to BS 7671, which update the standard between editions.',
    section: 'Standards',
    difficulty: 'basic',
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
    difficulty: 'intermediate',
    topic: 'IP Ratings',
    category: 'BS7671 Selection & Erection',
  },
  {
    id: 372,
    question: 'What is the purpose of RCD protection?',
    options: [
      'To provide additional protection against electric shock by detecting earth leakage',
      'To protect cables against overload and short-circuit current',
      'To limit voltage drop on long final circuits',
      'To bond exposed-conductive-parts to the earthing terminal',
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
    difficulty: 'intermediate',
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
    difficulty: 'basic',
    topic: 'Periodic Inspection',
    category: 'BS7671 Inspection & Testing',
  },

  // Final questions 381-400
  {
    id: 381,
    question: 'What is the recommended minimum height for socket outlets in new domestic premises?',
    options: [
      '150mm from floor level',
      '450mm from floor level (accessibility guidance)',
      '900mm from floor level',
      '1200mm from floor level',
    ],
    correctAnswer: 1,
    explanation:
      'Approved Document M recommends 450mm-1200mm above floor level for accessibility in new dwellings.',
    section: 'Accessibility',
    difficulty: 'intermediate',
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
      'To provide a low-impedance fault return path',
      'To limit voltage drop on the lighting circuit',
      'To reduce the disconnection time of the RCD',
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
    difficulty: 'advanced',
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
      'Only the name and address of the installer',
      'Only the test results for the final circuits',
      'Description of installation, test results, schedule of circuits, design and installation details',
      'Only the earthing arrangement and main bonding sizes',
    ],
    correctAnswer: 2,
    explanation:
      'EIC must include full installation details, extent covered, declaration, schedule of inspections, test results, and circuit schedules.',
    section: 'Certification',
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'PFC',
    category: 'BS7671 Inspection & Testing',
  },
  {
    id: 392,
    question: 'Where must PFC be measured?',
    options: [
      'At the origin and at the most remote point of the installation',
      'At the consumer unit neutral bar only',
      'At every accessory on each final circuit',
      'At the main earthing terminal only',
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
    difficulty: 'intermediate',
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
      'The prospective fault current and Ze value only',
      'The maximum demand and main fuse rating only',
      'The make and model of every protective device',
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
